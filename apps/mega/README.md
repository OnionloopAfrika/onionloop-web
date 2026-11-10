# @onion/mega

Next.js app inside the Onion monorepo.

```bash
pnpm --filter @onion/mega dev     # http://localhost:3002
pnpm --filter @onion/mega build
```

Routes live under `/mega/...`. The app root (`/`) redirects to `/mega/auth/login/`.
