# Onion monorepo

```
onion-monorepo/
├── apps/
│   ├── landing/      static HTML page that routes to each service
│   ├── crew/         OnionCrew         (Next.js, dev port 3001)
│   ├── mega/         OnionMega         (Next.js, dev port 3002)  <- was onionloop-web-prod
│   └── aggregator/   Onion Aggregator  (Next.js, dev port 3003)
├── deploy/Caddyfile  subdomain routing + automatic HTTPS
├── Dockerfile        one file, builds any app:  --build-arg APP=crew|mega|aggregator
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Local development

```bash
corepack enable
pnpm install

pnpm dev              # everything at once
pnpm dev:crew         # or one at a time: dev:mega, dev:aggregator, dev:landing
```

| App        | URL                   |
|------------|-----------------------|
| landing    | http://localhost:3000 |
| crew       | http://localhost:3001 |
| mega       | http://localhost:3002 |
| aggregator | http://localhost:3003 |

On localhost the landing page links to those ports automatically.

## Hosting

Each app is deployed on its own and lives on its own subdomain:

| Address                    | Serves     |
|----------------------------|------------|
| `onionloop.com`            | landing    |
| `crew.onionloop.com`       | crew       |
| `mega.onionloop.com`       | mega       |
| `aggregator.onionloop.com` | aggregator |

The landing page works out the subdomain links from whatever domain it is served on,
so there is nothing to edit when the domain changes. Overrides go in `apps/landing/config.js`.

### Option A: Vercel (least work)

Create **four projects** from this one repo. For each, set **Root Directory** and the
framework will be detected for you:

| Project    | Root Directory  | Framework | Domain                     |
|------------|-----------------|-----------|----------------------------|
| landing    | `apps/landing`  | Other (static) | `onionloop.com`       |
| crew       | `apps/crew`     | Next.js   | `crew.onionloop.com`       |
| mega       | `apps/mega`     | Next.js   | `mega.onionloop.com`       |
| aggregator | `apps/aggregator` | Next.js | `aggregator.onionloop.com` |

Add the domains under Project → Settings → Domains. Turn on "Skip deployments when
nothing changed in this project" so a change to crew does not redeploy the others.

### Option B: your own server (Docker + Caddy)

```bash
cp .env.example .env          # set ROOT_DOMAIN=onionloop.com
docker compose up --build -d
```

DNS: create `A` records for `@`, `www`, `crew`, `mega` and `aggregator` pointing at the
server (or one `*` wildcard record). Caddy routes by hostname and gets the HTTPS
certificates itself. Only ports 80 and 443 are exposed.

Per-app environment variables go in `apps/<app>/.env.production` (optional, git-ignored).

Redeploy one app: `docker compose up --build -d crew`

## Notes

- `/` on each Next.js app now redirects to its login page. The old product-picker
  page that each repo had is replaced by `apps/landing`.
- All three apps still contain their own copy of `components/`, `utils/`, `store/` etc.
  They were forks of the same codebase. Moving the shared parts into `packages/` is the
  natural next step, but it is a separate refactor.
