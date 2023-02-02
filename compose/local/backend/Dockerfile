FROM node:16.13.0 as node

FROM node AS install
WORKDIR /app
COPY package.json .
RUN npm install

FROM node
WORKDIR /usr/src/app
COPY --from=install /app .
COPY . .
ENTRYPOINT npm run start:dev