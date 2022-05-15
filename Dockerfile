# Copy package.json and install dependencies
FROM node:alpine as dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy app and dependencies and build
FROM node:alpine as builder
WORKDIR /app
COPY . .
RUN yarn add sharp
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn build

# Copy production folders and expose port
FROM node:alpine as runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 8082
CMD ["yarn", "start"]
