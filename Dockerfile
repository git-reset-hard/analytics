FROM node:boron
WORKDIR /server
# Install app dependencies
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "start" ]