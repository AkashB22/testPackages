FROM node:12

WORKDIR /app

RUN mkdir ./imagePath

COPY ./package*.json ./

RUN npm install

COPY app.js .

ENV PORT=8080

EXPOSE 8080

CMD ["npm", "start"]

