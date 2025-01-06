FROM node:20-slim

WORKDIR /app

RUN yarn -v || npm install -g yarn

COPY recipe_matcher_client/package.json recipe_matcher_client/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY recipe_matcher_client/ ./

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN yarn build

RUN yarn global add serve

USER node

CMD ["serve", "-s", "build"]
