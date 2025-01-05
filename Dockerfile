FROM node:20-slim

WORKDIR /app

RUN yarn -v || npm install -g yarn

COPY recipe_matcher_client/package.json recipe_matcher_client/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY recipe_matcher_client/ ./

ENV PORT=3001

RUN chown -R node:node /app

USER node

EXPOSE 3001

CMD ["yarn", "start"]
