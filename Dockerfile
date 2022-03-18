FROM node:16

ENV NODE_VERSION 16.14.1

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm install -g serve
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "serve"]