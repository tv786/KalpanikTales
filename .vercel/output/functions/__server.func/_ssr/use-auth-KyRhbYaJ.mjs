import { r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-Ek2-qFbi.mjs";
function useAuth() {
  const [session, setSession] = reactExports.useState(null);
  const [user, setUser] = reactExports.useState(null);
  const [profile, setProfile] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setTimeout(() => loadProfile(s.user.id), 0);
      } else {
        setProfile(null);
        setIsAdmin(false);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) loadProfile(data.session.user.id);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  async function loadProfile(uid) {
    const [{ data: p }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("id, username, avatar_url, bio").eq("id", uid).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", uid)
    ]);
    setProfile(p);
    setIsAdmin(Boolean(roles?.some((r) => r.role === "admin")));
  }
  async function logout() {
    await supabase.auth.signOut();
  }
  return { session, user, profile, isAdmin, loading, logout };
}
export {
  useAuth as u
};
