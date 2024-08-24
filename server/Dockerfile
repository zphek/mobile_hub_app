FROM node:latest

WORKDIR /workspace/server

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "./dist/app.js"]
