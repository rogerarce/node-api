FROM node:12.16.3

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . /app

CMD ["npm", "start"]

