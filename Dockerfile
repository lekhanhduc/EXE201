FROM node:22-alpine
WORKDIR /APP
COPY package.json .
RUN npm install
RUN npm install typescript --save-dev
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]