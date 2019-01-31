### STAGE 1: Build ###

FROM node:10.15.0 AS builder

WORKDIR /jubilant

COPY ./package.json ./
COPY ./package-lock.json ./

RUN set -ex &&\
  npm install

COPY ./ ./

RUN $(npm bin)/ng build --prod

### STAGE 2: Serve ###

FROM nginx:alpine as server

LABEL description=""
LABEL maintainer=""

## Copy our default nginx config
COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /jubilant/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
