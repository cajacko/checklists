FROM node:12

# SETUP
WORKDIR /usr/src/app
RUN mkdir web
COPY .env ./.env
COPY .env ./web/.env

# WEB
WORKDIR /usr/src/app
COPY web/package.json ./web
COPY web/yarn.lock ./web
WORKDIR /usr/src/app/web
RUN yarn install --frozen-lockfile --production
WORKDIR /usr/src/app
COPY web ./web
WORKDIR /usr/src/app/web
RUN yarn build

# APP
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./tsconfig.json
RUN yarn install --frozen-lockfile --production
COPY server ./server
RUN yarn build:tsc

# RUN
# TODO: Use pm2
WORKDIR /usr/src/app
EXPOSE 8080
CMD [ "node", "dist/index.js" ]