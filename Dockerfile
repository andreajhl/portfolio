FROM node:12.4.0

WORKDIR /app

COPY . /app

RUN npm install

CMD npm run-script build

RUN serve -s build

EXPOSE 5000
