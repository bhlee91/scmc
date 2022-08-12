# ./Dockerfile

FROM nginx

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./conf.d/react-lb.conf /etc/nginx/conf.d/react-lb.conf

# 7070 포트 오픈
EXPOSE 7070

CMD ["nginx", "-g", "daemon off;"]
