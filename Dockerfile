FROM node:18.16.0-alpine
WORKDIR /var/www/tsTestProject
RUN npm install -g typescript