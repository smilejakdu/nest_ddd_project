FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf || true
COPY compose/local/nginx/nginx.conf /etc/nginx
COPY compose/local/nginx/ddd.conf /etc/nginx/conf.d