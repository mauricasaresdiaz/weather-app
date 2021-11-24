FROM node:16.13.0 AS build-image

RUN mkdir -p /home/node/weather
WORKDIR /home/node/weather

COPY . .
RUN npm install
RUN npm run build

FROM node:16.13.0

RUN mkdir -p /home/node/weather
WORKDIR /home/node/weather

COPY --from=build-image --chown=node:node /home/node/weather/dist ./dist
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install --production

CMD ["npm","start"]
EXPOSE 3800