FROM nginx:alpine
COPY . /usr/share/nginx/html
# Define preview_login.html como index.html se index.html não existir
RUN cp /usr/share/nginx/html/preview_login.html /usr/share/nginx/html/index.html
EXPOSE 80
