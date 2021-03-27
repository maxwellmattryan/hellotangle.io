## BUILD STAGE ##
FROM node:15.12.0-alpine3.10 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

## PRODUCTION STAGE ##
FROM node:15.12.0-alpine3.10 AS prod

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

COPY --from=builder /usr/src/app/dist ./dist

CMD ["npm", "run", "start"]
