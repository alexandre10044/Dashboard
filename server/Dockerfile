FROM node:10

MAINTAINER Alexandre Frydman "@@epitech.eu"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g mysql

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]