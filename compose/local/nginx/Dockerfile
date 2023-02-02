FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf || true
COPY compose/local/nginx/nginx.conf /etc/nginx
COPY compose/local/nginx/ddd.conf /etc/nginx/conf.d

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]