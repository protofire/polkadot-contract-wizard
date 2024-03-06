FROM node:18-alpine as runner

COPY . ./

RUN yarn install

RUN yarn build

ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000
ENV PORT 3000

CMD [ "yarn", "start" ]