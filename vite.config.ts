// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    build: {
      chunkSizeWarningLimit: 500, // Reduced from 1000 to encourage better code splitting
      rollupOptions: {
        onwarn(warning, warn) {
          // Ignore unused imports from TanStack router packages
          if (warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
              warning.message.includes('@tanstack')) {
            return;
          }
          warn(warning);
        },
      },
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },

  nitro: {
    preset: "vercel",
    // Supabase auth-js imports tslib at runtime; bundle it into the server output
    // so Vercel functions don't fail with ERR_MODULE_NOT_FOUND.
    noExternals: ["tslib"],
  },
});
