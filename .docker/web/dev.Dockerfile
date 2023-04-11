FROM node:16-alpine AS dependencies
WORKDIR /home/app

RUN apk add --no-cache libc6-compat
COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# Builder
FROM node:16-alpine AS builder 
WORKDIR /home/app

COPY --from=dependencies /home/app/node_modules ./node_modules
COPY . ./

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# Runner 
FROM node:16-alpine AS runner 
WORKDIR /home/app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /home/app/.next ./.next
COPY --from=builder /home/app/node_modules ./node_modules
COPY --from=builder /home/app/package.json ./package.json

ENV NEXT_TELEMETRY_DISABLED 1

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD [ "yarn", "start" ]