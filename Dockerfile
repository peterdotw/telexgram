FROM node:latest

COPY . .

RUN npm install

CMD cross-env NODE_ENV=production node server/server.js