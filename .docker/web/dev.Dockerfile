FROM node:16-alpine as runner

COPY . ./

RUN yarn install

RUN yarn build

EXPOSE 3000
ENV PORT 3000

CMD [ "yarn", "start" ]