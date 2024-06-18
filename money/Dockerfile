FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g mysql

COPY . .

CMD [ "node", "money.js" ]
