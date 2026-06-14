Vercel deployment guide for KalpanikTales

Prerequisites
- Repo pushed to GitHub, GitLab, or Bitbucket
- Vercel account (https://vercel.com)
- Supabase project credentials: SUPABASE_URL and SUPABASE_ANON_KEY (and SUPABASE_SERVICE_ROLE_KEY for server-only operations)

Quick static deployment (recommended)
1. Go to Vercel and click "New Project" → "Import Git Repository" and select your repository branch.
2. In the Import settings set:
   - Framework Preset: Other or Vite
   - Install Command: `npm install` (or `bun install` / `pnpm install` if you use those)
   - Build Command: `npm run build` (this runs `vite build`)
   - Output Directory: `dist`
   (The included `vercel.json` uses `@vercel/static-build`, which will run the `build` script and serve `dist`.)
3. Add Environment Variables (Project → Settings → Environment Variables):
   - `SUPABASE_URL` → your Supabase URL
   - `SUPABASE_ANON_KEY` → your public anon key
   - (optional, server-only) `SUPABASE_SERVICE_ROLE_KEY` → service role key (do NOT expose to client-side code)
   Set these for `Preview` and `Production` as needed.
4. Deploy: Vercel will start a preview deployment and give you a staging URL like `https://your-project-xyz.vercel.app`.

Notes for SPA routing
- `vercel.json` contains a route rewrite that sends all paths to `/index.html`, preserving client-side routing.

Optional: server runtime (server-side code)
- This project includes `src/start.ts` (server middleware). Converting that to run on Vercel Functions requires adding an `api/` adapter and possibly changing server startup logic.
- If you need server-side rendering or server-only endpoints, consider using Render or Fly if you prefer a long-running Node process.

Local verification
- Build locally to ensure no build errors:

```bash
npm install
npm run build
# open dist/ locally, or run a static server, e.g.:
npx serve dist
```

Troubleshooting
- Build fails: check Vercel build logs; make sure `npm run build` succeeds locally first.
- Missing assets: ensure static files are under `public/` (e.g., `public/favicon.png`)
- Supabase errors: confirm env values and CORS settings in Supabase (allow your Vercel preview domain if needed)

If you want, I can:
- Add an `api/` adapter and `vercel.json` for serverless functions.
- Create a small GitHub Actions workflow to auto-deploy on push (not required by Vercel).

End of guide.
