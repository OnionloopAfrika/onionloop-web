# One Dockerfile for every Next.js app in the repo.
#   docker build -f deploy/Dockerfile --build-arg APP=crew -t onion-crew .
# Lives in deploy/ (not the repo root) so Vercel does not mistake it for the project's build.
# APP is the folder name under apps/ (crew | mega | aggregator).

# ── Builder ───────────────────────────────────
FROM node:20-alpine AS builder
ARG APP
RUN corepack enable
WORKDIR /repo

# Copy everything (see .dockerignore), then install only this app's deps
COPY . .
RUN pnpm install --frozen-lockfile --filter "@onion/${APP}..."
RUN pnpm --filter "@onion/${APP}" build

# ── Runner ────────────────────────────────────
FROM node:20-alpine AS runner
ARG APP
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    APP_DIR=apps/${APP}
RUN apk add --no-cache wget
WORKDIR /repo

# Standalone output keeps the monorepo layout: /repo/apps/<app>/server.js
COPY --from=builder /repo/apps/${APP}/.next/standalone ./
COPY --from=builder /repo/apps/${APP}/.next/static ./apps/${APP}/.next/static
COPY --from=builder /repo/apps/${APP}/public ./apps/${APP}/public

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --spider -q http://localhost:3000/ || exit 1

CMD ["sh", "-c", "node ${APP_DIR}/server.js"]