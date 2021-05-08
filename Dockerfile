
FROM node:15.11-alpine

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 4000

CMD npm run dev