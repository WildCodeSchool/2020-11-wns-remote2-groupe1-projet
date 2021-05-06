
FROM node:15.11-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

CMD [ "npm", "run", "dev" ]