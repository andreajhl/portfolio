FROM node:12.4.0

WORKDIR /app

COPY . /app

RUN npm install

RUN npm install serve -g

CMD npm run-script build

CMD serve -s build

EXPOSE 5000
