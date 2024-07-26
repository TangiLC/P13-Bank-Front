# frontend/Dockerfile
FROM node:18-alpine AS prod

WORKDIR /app

COPY package.json /app

COPY . /app

RUN ls

RUN npm install

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]

#FROM nginx:alpine

#WORKDIR /usr/local/bin