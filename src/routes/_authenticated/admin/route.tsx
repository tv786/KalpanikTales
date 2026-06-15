import { createFileRoute, Link, Outlet, redirect, useLocation } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async ({ context }) => {
    const userId = (context as { user?: { id: string } }).user?.id;
    if (!userId) throw redirect({ to: "/auth" });
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (error || !data) throw redirect({ to: "/" });
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { pathname } = useLocation();
  const tabs = [
    { to: "/admin", label: "Books", exact: true },
    { to: "/admin/users", label: "Users" },
  ];
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-3xl">Admin</h1>
      </div>
      <nav className="mb-6 flex gap-2 border-b border-border">
        {tabs.map((t) => {
          const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
          return (
            <Link
              key={t.to}
              to={t.to}
              className={cn(
                "border-b-2 px-3 py-2 text-sm",
                active
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
      <Outlet />
    </div>
  );
}
