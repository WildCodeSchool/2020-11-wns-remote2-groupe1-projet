FROM node:14.17-alpine

WORKDIR /app

COPY package*.json /app/

RUN apk add --update python make g++\
    && rm -rf /var/cache/apk/*

RUN npm install

COPY . /app/