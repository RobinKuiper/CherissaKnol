from node:alpine

# Set working directory
WORKDIR /usr/app

# Installing dependencies
COPY package*.json yarn.lock ./
RUN yarn

# Copy files to app directory
COPY . .

# Build app
RUN yarn build

EXPOSE 8082

# Run as user node
USER node

# Start app
CMD ["npm", "start"]