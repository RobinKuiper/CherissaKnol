# Copy production folders and expose port
FROM node:16.19.0 as runner
WORKDIR /app
ENV NODE_ENV production

RUN echo "Copying production folders..."
COPY ./next.config.js ./
COPY ./public ./public
COPY ./.next ./.next
COPY ./node_modules ./node_modules
COPY ./package.json ./package.json
COPY ./prisma ./prisma
COPY ./entry.sh ./entry.sh

RUN chmod +x ./entry.sh

RUN npm i -g pnpm
RUN echo "Exposing port..."
EXPOSE 8082
RUN echo "Starting..."
CMD ["sh", "./docker/entry.sh"]
