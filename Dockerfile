# Use NODE 22
FROM node:22

WORKDIR /app

# add .env to .dockerignore if you plan to push this image to a public container registry
COPY package*.json ./
RUN npm install

COPY server ./server
COPY src ./src
COPY index.html ./index.html
COPY vite.config.js ./vite.config.js
COPY .env ./.env
COPY public ./public

RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "server/server.js"]


# run the server with the command docker run -p 8080:8080 --env-file .env my-node-server
# make sure the port used matches the SERVER_PORT configuration
