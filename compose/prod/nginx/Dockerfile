FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf || true
COPY compose/prod/nginx/nginx.conf /etc/nginx
COPY compose/prod/nginx/ddd.conf /etc/nginx/conf.d