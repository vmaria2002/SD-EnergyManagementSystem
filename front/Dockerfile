FROM node:18.17.0-alpine
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD npm start
EXPOSE 3000
