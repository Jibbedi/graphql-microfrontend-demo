FROM node:10-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm run build:app
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]