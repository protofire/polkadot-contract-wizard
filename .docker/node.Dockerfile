FROM node:18.5

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install yarn
# RUN npm install -g yarn

# Install app dependencies
RUN yarn install

# Expose port
EXPOSE 3000

# Start application
CMD [ "yarn", "dev" ]