FROM node:8.9.1

ADD . /var/app

USER node

CMD "npm start"