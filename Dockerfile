FROM node:10.16.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
expose 80
CMD ["npm","run","dev"]