import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listAdminUsers, deleteAdminUser } from "@/lib/users.functions";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/users")({
  component: AdminUsers,
});

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function UserAvatar({ username, email, avatarUrl }: { username: string | null; email: string | null; avatarUrl: string | null }) {
  const label = username ?? email ?? "?";
  const initial = label.charAt(0).toUpperCase();

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt=""
        className="h-9 w-9 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
      {initial}
    </div>
  );
}

function AdminUsers() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminUser({ data: { id } }),
    onSuccess: () => {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete user");
    },
  });

  const handleDeleteUser = (id: string, username: string | null) => {
    if (window.confirm(`Are you sure you want to delete user ${username || id}? This action cannot be undone.`)) {
      deleteMutation.mutate(id);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => listAdminUsers(),
  });

  const filteredUsers = useMemo(() => {
    const users = data?.users ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((user) => {
      const haystack = [user.username, user.email, user.bio, user.roles.join(" ")]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [data?.users, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-sm text-muted-foreground">
            Registered accounts with profile and sign-in details.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
          <Users className="h-5 w-5 text-primary" />
          <div>
            <p className="text-2xl font-semibold leading-none">{data?.total ?? "—"}</p>
            <p className="text-xs text-muted-foreground">Total users</p>
          </div>
        </div>
      </div>

      <Input
        placeholder="Search by username, email, or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {isLoading ? (
        <p className="text-muted-foreground">Loading users...</p>
      ) : error ? (
        <p className="text-destructive">
          {error instanceof Error ? error.message : "Failed to load users"}
        </p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-muted-foreground">
          {search ? "No users match your search." : "No users yet."}
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Joined</th>
                <th className="px-4 py-2">Last sign-in</th>
                <th className="px-4 py-2">Bio</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        username={user.username}
                        email={user.email}
                        avatarUrl={user.avatarUrl}
                      />
                      <div>
                        <p className="font-medium">{user.username ?? "—"}</p>
                        {!user.emailConfirmed && (
                          <p className="text-xs text-muted-foreground">Email unverified</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{user.email ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => (
                        <Badge
                          key={role}
                          variant={role === "admin" ? "default" : "secondary"}
                          className="capitalize"
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(user.createdAt)}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {user.lastSignInAt ? formatDate(user.lastSignInAt) : "Never"}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                    {user.bio ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteUser(user.id, user.username)}
                      disabled={deleteMutation.isPending}
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      title="Delete user"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isLoading && !error && search && (
        <p className="text-sm text-muted-foreground">
          Showing {filteredUsers.length} of {data?.total ?? 0} users
        </p>
      )}
    </div>
  );
}
