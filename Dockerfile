FROM node:12.4.0

WORKDIR /app

COPY . /app

RUN npm install

CMD npm start

EXPOSE 3000
