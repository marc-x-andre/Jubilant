### STAGE 1: Angular Build ###

FROM node:10.15.0 AS builder

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN set -ex &&\
  npm -v &&\
  npm install

COPY ./ ./

RUN $(npm bin)/ng build --prod

### STAGE 2: Express Server Build ###

FROM node:10.15.0 AS deploy

WORKDIR /jubilant

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./ ./

## Copy compile angular app to static folder
COPY --from=builder /app/dist /jubilant/static

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

RUN ls server

## Copy over the artifacts in server folder to default nginx public folder
COPY /server /usr/share/nginx/html

## Copy our default nginx config
COPY nginx.conf /etc/nginx/nginx.conf

### STAGE 3: Serve ###

EXPOSE 80

LABEL description="Jubilant App Image"
LABEL maintainer="Marc-Andre Daigneault <contact@the224.dev>"

CMD ["npm", "start"]
