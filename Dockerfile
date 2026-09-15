FROM node:24.7-alpine AS builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN npm run build

FROM node:24.7-alpine

WORKDIR /usr/app

COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/public ./public
COPY --from=builder /usr/app/package*.json ./

ENV NODE_ENV=production

RUN mkdir /.config && chgrp -R 0 /.config

EXPOSE 3000

CMD ["npm", "start"]