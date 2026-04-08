FROM nginx:alpine

# Чистим стандартный HTML
RUN rm -rf /usr/share/nginx/html/*

# Копируем файлы проекта
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
