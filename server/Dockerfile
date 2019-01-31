### STAGE 1: Build ###

FROM node:10.15.0 AS builder

WORKDIR /jubilant/server

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./ ./

### STAGE 2: Serve ###

EXPOSE 3000

CMD [ "npm", "start" ]
