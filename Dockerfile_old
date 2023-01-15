# Copy package.json and install dependencies
FROM node:16.19.0 as dependencies
WORKDIR /app
RUN echo "Installing dependencies..."
RUN npm i -g pnpm
COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm add sharp
RUN pnpm install --frozen-lockfile

# Copy app and dependencies and build
FROM node:16.19.0 as builder
WORKDIR /app
RUN echo "Copying app and dependencies..."
COPY . .
COPY --from=dependencies /app/package.json /app/pnpm-lock.yaml ./
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm i -g pnpm
RUN pnpm prisma migrate deploy
RUN pnpm prisma generate
RUN pnpm prisma db seed
RUN echo "Building..."
RUN pnpm build

# Copy production folders and expose port
FROM node:16.19.0 as runner
WORKDIR /app
ENV NODE_ENV production

RUN echo "Copying production folders..."
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/entry.sh ./entry.sh

RUN chmod +x ./entry.sh

RUN npm i -g pnpm
RUN echo "Exposing port..."
EXPOSE 8082
RUN echo "Starting..."
CMD ["sh", "./docker/entry.sh"]
