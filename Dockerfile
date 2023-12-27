FROM oven/bun

WORKDIR /usr/src/app

COPY package*.json bun.lockb ./
RUN bun install

RUN apt-get update && apt-get install -y chromium

COPY . .

ENV NODE_ENV production

CMD [ "bun", "start" ]