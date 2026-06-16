import { T as TSS_SERVER_FUNCTION, c as createServerFn } from "./server-Cv-Zy4CN.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-B4h29_rw.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/tslib.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
async function requireAdmin(context) {
  const {
    data: role,
    error: roleError
  } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (roleError || !role) throw new Error("Only admins can view users");
}
const listAdminUsers_createServerFn_handler = createServerRpc({
  id: "ed3ceab58a919703a723479fbecac5a7d57863588d1ff985f9c8d6a6260910ba",
  name: "listAdminUsers",
  filename: "src/lib/users.functions.ts"
}, (opts) => listAdminUsers.__executeServer(opts));
const listAdminUsers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listAdminUsers_createServerFn_handler, async ({
  context
}) => {
  await requireAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const authUsers = [];
  let page = 1;
  const perPage = 1e3;
  while (true) {
    const {
      data,
      error
    } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage
    });
    if (error) throw error;
    authUsers.push(...data.users);
    if (data.users.length < perPage) break;
    page += 1;
  }
  const [{
    data: profiles,
    error: profilesError
  }, {
    data: roles,
    error: rolesError
  }] = await Promise.all([supabaseAdmin.from("profiles").select("id, username, avatar_url, bio, created_at"), supabaseAdmin.from("user_roles").select("user_id, role")]);
  if (profilesError) throw profilesError;
  if (rolesError) throw rolesError;
  const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));
  const rolesByUser = (roles ?? []).reduce((acc, row) => {
    const list = acc[row.user_id] ?? [];
    list.push(row.role);
    acc[row.user_id] = list;
    return acc;
  }, {});
  const users = authUsers.map((authUser) => {
    const profile = profileById.get(authUser.id);
    return {
      id: authUser.id,
      email: authUser.email ?? null,
      username: profile?.username ?? null,
      avatarUrl: profile?.avatar_url ?? null,
      bio: profile?.bio ?? null,
      roles: rolesByUser[authUser.id] ?? ["reader"],
      createdAt: profile?.created_at ?? authUser.created_at ?? (/* @__PURE__ */ new Date(0)).toISOString(),
      lastSignInAt: authUser.last_sign_in_at ?? null,
      emailConfirmed: !!authUser.email_confirmed_at
    };
  });
  users.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return {
    total: users.length,
    users
  };
});
const deleteAdminUser_createServerFn_handler = createServerRpc({
  id: "0e9b8a18e7961a2b705a6ce9c7508d1b2ba0c69a04f5015a48eb872375110502",
  name: "deleteAdminUser",
  filename: "src/lib/users.functions.ts"
}, (opts) => deleteAdminUser.__executeServer(opts));
const deleteAdminUser = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((data) => object({
  id: string()
}).parse(data)).handler(deleteAdminUser_createServerFn_handler, async ({
  context,
  data
}) => {
  await requireAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    error
  } = await supabaseAdmin.auth.admin.deleteUser(data.id);
  if (error) {
    throw error;
  }
  return {
    success: true
  };
});
export {
  deleteAdminUser_createServerFn_handler,
  listAdminUsers_createServerFn_handler
};
