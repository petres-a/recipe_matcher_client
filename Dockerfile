FROM node:20-slim

WORKDIR /app

RUN yarn -v || npm install -g yarn

COPY recipe_matcher_client/package.json recipe_matcher_client/yarn.lock ./
RUN yarn install --frozen-lockfile

COPY recipe_matcher_client/ ./

RUN chown -R node:node /app

USER node

CMD ["yarn", "start", "--host", "0.0.0.0"]
