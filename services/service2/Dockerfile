FROM node:8-alpine

RUN apk --no-cache add bash git openssh

RUN apk --no-cache add --virtual builds-deps build-base python

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["node", "app.js"]