FROM node:14

COPY package*.json ./

RUN npm install

COPY . /opt/source-code

EXPOSE 8000

ENV PORT=8000
ENV DATABASE=MONGO
ENV MONGO_URI=mongodb://localhost:27017/ToDoApp
ENV GOOGLE_CLIENT_ID=14141901307-u318sh14095g2nkgo441bola22t6kt3v.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=69f-q1YtQzF4AKzqk9GupF_o
ENV GOOGLE_AUTH_REDIRECT=http://localhost:8000/auth/google/callback
ENV ACCESS_TOKEN_SECRET=mysecretkey
ENV ACCESS_TOKEN_LIFE=300
ENV REFRESH_TOKEN_SECRET=mysecretkey
ENV REFRESH_TOKEN_LIFE=1000
ENV SQL_HOST=localhost
ENV SQL_USER=root
ENV SQL_PASSWORD=12345
ENV SQL_DATABASE=testdb
ENV SQL_DIALECT=mysql

CMD [ "node", "/opt/source-code/bin/www.js", "start" ]