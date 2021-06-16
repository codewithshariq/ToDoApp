FROM node:14

COPY package*.json ./

RUN npm install

COPY . /opt/source-code

EXPOSE 8000

CMD [ "node", "/bin/www.js start" ]