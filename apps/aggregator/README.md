# @onion/aggregator

Next.js app inside the Onion monorepo.

```bash
pnpm --filter @onion/aggregator dev     # http://localhost:3003
pnpm --filter @onion/aggregator build
```

Routes live under `/aggregator/...`. The app root (`/`) redirects to `/aggregator/auth/login/`.
