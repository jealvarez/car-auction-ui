# -----------------------------------
# STAGE 1: Build
# -----------------------------------
FROM node:10 AS builder

WORKDIR /car-auction-ui

COPY package.json .

COPY .yarnrc .

RUN yarn install

COPY ./ .

ARG ENV=--prod

RUN $(npm bin)/ng build --aot ${ENV}

# -----------------------------------
# STAGE 2: Setup
# -----------------------------------
FROM nginx:1.15.9-alpine

LABEL maintainers="Jorge Alvarez <alvarez.jeap@gmail.com>"

WORKDIR /opt/apps/car-auction-ui

COPY ./docker/entrypoint.sh .

COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./docker/nginx/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/* \
    && touch /var/run/nginx.pid \
    && adduser -D car-auction-ui \
    && chown -R car-auction-ui /var/run/nginx.pid \
    && chown -R car-auction-ui /var/cache/nginx 

COPY --from=builder /car-auction-ui/dist/car-auction-ui /usr/share/nginx/html

ENV PORT 8000

EXPOSE $PORT

USER car-auction-ui

ENTRYPOINT ["/bin/sh", "/opt/apps/car-auction-ui/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]