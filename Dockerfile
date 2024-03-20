FROM node:18-alpine as development

WORKDIR /user/src/app

COPY package*.json ./

COPY . .

RUN npm ci

CMD ["npm", "run", "start:dev"]

FROM node:18-alpine as production

WORKDIR /user/src/app

RUN chown -R node:node /user/src/app
USER node
COPY --chown=node:node . .

RUN npm ci && npm run build && npm prune --production

CMD ["npm", "run", "start:prod"]
