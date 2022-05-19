# Copy package.json and install dependencies
FROM node:lts as dependencies
WORKDIR /app
RUN echo "Installing dependencies..."
COPY package.json pnpm-lock.yaml ./
RUN pnpm add sharp
RUN pnpm install --frozen-lockfile

# Copy app and dependencies and build
FROM node:lts as builder
WORKDIR /app
RUN echo "Copying app and dependencies..."
COPY . .
COPY --from=dependencies /app/package.json /app/yarn.lock ./
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm prisma migrate deploy
RUN pnpm prisma generate
RUN pnpm prisma db seed
RUN echo "Building..."
RUN pnpm build

# Copy production folders and expose port
FROM node:lts as runner
WORKDIR /app
ENV NODE_ENV production

RUN echo "Copying production folders..."
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

RUN echo "Exposing port..."
EXPOSE 8082
RUN echo "Starting..."
CMD ["pnpm", "start"]
