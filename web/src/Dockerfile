## BUILD STAGE ##
FROM node:15.10.0-alpine3.10 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add git
RUN npm install

COPY . .

RUN npm run build

## PRODUCTION STAGE ##
FROM node:15.10.0-alpine3.10 AS prod

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add git
RUN npm install

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

CMD ["npm", "run", "start"]
