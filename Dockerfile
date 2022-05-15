from node:12

ENV PORT 8082

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Installing dependencies
COPY package*.json /app
RUN npm install

# Copy files to app directory
COPY . /app

# Build app
RUN npm run build
EXPOSE 8082

# Start app
CMD ["npm", "dev"]