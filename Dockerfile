FROM node:12-alpine

WORKDIR /app

COPY package*.json /app/

RUN apk add --update python make g++\
    && rm -rf /var/cache/apk/*

RUN npm install

COPY . /app/