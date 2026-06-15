import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminUserRow = {
  id: string;
  email: string | null;
  username: string | null;
  avatarUrl: string | null;
  bio: string | null;
  roles: ("admin" | "reader")[];
  createdAt: string;
  lastSignInAt: string | null;
  emailConfirmed: boolean;
};

async function requireAdmin(context: {
  supabase: import("@supabase/supabase-js").SupabaseClient<
    import("@/integrations/supabase/types").Database
  >;
  userId: string;
}) {
  const { data: role, error: roleError } = await context.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", context.userId)
    .eq("role", "admin")
    .maybeSingle();

  if (roleError || !role) throw new Error("Only admins can view users");
}

export const listAdminUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const authUsers: Array<{
      id: string;
      email?: string;
      created_at?: string;
      last_sign_in_at?: string;
      email_confirmed_at?: string | null;
    }> = [];

    let page = 1;
    const perPage = 1000;
    while (true) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
      if (error) throw error;
      authUsers.push(...data.users);
      if (data.users.length < perPage) break;
      page += 1;
    }

    const [{ data: profiles, error: profilesError }, { data: roles, error: rolesError }] =
      await Promise.all([
        supabaseAdmin.from("profiles").select("id, username, avatar_url, bio, created_at"),
        supabaseAdmin.from("user_roles").select("user_id, role"),
      ]);

    if (profilesError) throw profilesError;
    if (rolesError) throw rolesError;

    const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));
    const rolesByUser = (roles ?? []).reduce<Record<string, ("admin" | "reader")[]>>((acc, row) => {
      const list = acc[row.user_id] ?? [];
      list.push(row.role);
      acc[row.user_id] = list;
      return acc;
    }, {});

    const users: AdminUserRow[] = authUsers.map((authUser) => {
      const profile = profileById.get(authUser.id);
      return {
        id: authUser.id,
        email: authUser.email ?? null,
        username: profile?.username ?? null,
        avatarUrl: profile?.avatar_url ?? null,
        bio: profile?.bio ?? null,
        roles: rolesByUser[authUser.id] ?? ["reader"],
        createdAt: profile?.created_at ?? authUser.created_at ?? new Date(0).toISOString(),
        lastSignInAt: authUser.last_sign_in_at ?? null,
        emailConfirmed: !!authUser.email_confirmed_at,
      };
    });

    users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return { total: users.length, users };
  });

import { z } from "zod";

export const deleteAdminUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ context, data }) => {
    await requireAdmin(context);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.id);
    if (error) {
      throw error;
    }

    return { success: true };
  });
