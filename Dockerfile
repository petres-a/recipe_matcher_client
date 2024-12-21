FROM node:20-slim

WORKDIR /app

RUN command -v yarn || npm install -g yarn

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

ENV PORT=3001

EXPOSE 3001

CMD ["yarn", "start"]
