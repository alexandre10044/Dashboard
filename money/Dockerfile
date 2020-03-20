FROM node:10

MAINTAINER Alexandre Frydman "@@epitech.eu"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g mysql

COPY . .

CMD [ "node", "money.js" ]