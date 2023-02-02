FROM node:16.15.1-alpine3.14 as node

FROM node AS install
WORKDIR /app
COPY package.json .
RUN npm install

FROM node as builder
WORKDIR /app
COPY . .
COPY --from=install /app/node_modules ./node_modules
RUN npm run build

FROM node
WORKDIR /usr/src/app
COPY --from=builder /app .

CMD node ./dist/main.js
