# Copy package.json and install dependencies
FROM node:lts as dependencies
WORKDIR /app
RUN echo "Installing dependencies..."
COPY package.json yarn.lock ./
RUN yarn add sharp
RUN yarn install --frozen-lockfile

# Copy app and dependencies and build
FROM node:lts as builder
WORKDIR /app
RUN echo "Copying app and dependencies..."
COPY . .
COPY --from=dependencies /app/package.json /app/yarn.lock ./
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn prisma migrate deploy
RUN yarn prisma generate
RUN echo "Building..."
RUN yarn build

# Copy production folders and expose port
FROM node:lts as runner
WORKDIR /app
ENV NODE_ENV production

RUN echo "Copying production folders..."
# TODO: Check if everything is needed
#COPY --from=builder /app/data ./data
# COPY --from=builder /app/prisma/migrations ./prisma/migrations
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN echo "Exposing port..."
EXPOSE 8082
RUN echo "Starting..."
CMD ["yarn", "start"]
