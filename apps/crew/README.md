# @onion/crew

Next.js app inside the Onion monorepo.

```bash
pnpm --filter @onion/crew dev     # http://localhost:3001
pnpm --filter @onion/crew build
```

Routes live under `/crew/...`. The app root (`/`) redirects to `/crew/auth/login/`.
