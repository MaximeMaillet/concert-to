FROM node:8.9.1

ARG API_URL
ARG API_PORT

ADD . /var/app

RUN chown -R node. /var/app

ENV API_URL "$API_URL"
ENV API_PORT "$API_PORT"

WORKDIR /var/app

USER node

RUN npm i && npm run front:prod

EXPOSE "$API_PORT"

CMD ["npm", "run", "back:prod"]