FROM node:18.16.0-alpine
WORKDIR /var/www/tsTestProject
RUN npm install -g typescript
RUN npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
COPY package*.json ./
COPY . .
CMD ["npm", "run", "start"]