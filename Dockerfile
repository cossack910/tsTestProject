FROM node:18.16.0-alpine
WORKDIR /var/www/tsTestProject
COPY package*.json ./
#RUN npm install -g typescript
#RUN npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
# distフォルダクリーン用
#RUN npm install --save-dev clean-webpack-plugin
#RUN npm install --save @types/lodash
COPY . .
CMD ["npm", "run", "start"]