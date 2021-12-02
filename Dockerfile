FROM node:12-alpine

WORKDIR /app

COPY package*.json /app/

RUN apk add python3 make g++\
    && echo 'alias python="/usr/share/gcc-8/python3"' >> /etc/bash.bashrc \
    && source /etc/bash.bashrc\
    && npm config set python=python3\
    && rm -rf /var/cache/apk/*


RUN npm install

COPY . /app/