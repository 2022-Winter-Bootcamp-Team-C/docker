#FROM nginx:latest
#
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/conf.d

#
#FROM nginx:latest
#
#RUN rm /etc/nginx/nginx.conf
#COPY nginx.conf /etc/nginx/
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/conf.d


FROM nginx:latest

# Delete nginx default configuration file in virtual directory
# 가상 공간의 nginx 기본 설정파일 삭제 후 작성한 설정파일로 대체
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d