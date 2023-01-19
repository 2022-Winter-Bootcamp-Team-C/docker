#FROM python:3.8.3-alpine
#
#ENV PYTHONDONTWRITEBYTECODE 1
#ENV PYTHONUNBUFFERED 1
#
#ARG DJANGO_ALLOWED_HOSTS
#ARG DJANGO_SECRET_KEY
#ARG DJANGO_CORS_ORIGIN_WHITELIST
#
#ENV DJANGO_ALLOWED_HOSTS $DJANGO_ALLOWED_HOSTS
#ENV DJANGO_SECRET_KEY $DJANGO_SECRET_KEY
#ENV DJANGO_CORS_ORIGIN_WHITELIST $DJANGO_CORS_ORIGIN_WHITELIST
#
#WORKDIR /backend
#COPY requirements.txt /backend/
#
##RUN pip install --upgrade --ignore-installed pip setuptools
#RUN pip3 install --upgrade pip
#RUN pip3 install --upgrade setuptools
#RUN pip3 install mysql-client
#RUN pip3 install -r requirements.txt
##RUN pip install ez_setup
#
#COPY . /backend/
#
#FROM python:3.8.3-alpine
#
#ENV PYTHONDONTWRITEBYTECODE 1
#ENV PYTHONUNBUFFERED 1
#
#ARG DJANGO_ALLOWED_HOSTS
#ARG DJANGO_SECRET_KEY
#ARG DJANGO_CORS_ORIGIN_WHITELIST
#
#ENV DJANGO_ALLOWED_HOSTS $DJANGO_ALLOWED_HOSTS
#ENV DJANGO_SECRET_KEY $DJANGO_SECRET_KEY
#ENV DJANGO_CORS_ORIGIN_WHITELIST $DJANGO_CORS_ORIGIN_WHITELIST
#
#WORKDIR /backend
#COPY requirements.txt /backend/
#
#RUN pip install --upgrade pip
#RUN pip3 install -r requirements.txt
#EXPOSE 8000
#CMD pt
#
#COPY . /backend/

#FROM python:3.8
#
#WORKDIR /app
#
#COPY ./ ./
#
#EXPOSE 8000
#
#RUN pip install --upgrade pip && \
#    pip install -r requirements.txt && \
#    apt-get -y update && apt-get -y install vim && apt-get clean
#
## 파이썬 설치가 먼저 \

FROM python:3.8.3

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
#PYTHONDONTWRITEBYTECODE: Python이 pyc 파일을 디스크에 쓰는 것을 방지합니다( python -B 옵션 과 동일 ) .
#PYTHONUNBUFFERED: Python이 stdout 및 stderr를 버퍼링하는 것을 방지합니다( python -u option 과 동일 ) .


ARG DJANGO_ALLOWED_HOSTS
ARG DJANGO_SECRET_KEY
ARG DJANGO_CORS_ORIGIN_WHITELIST

ENV DJANGO_ALLOWED_HOSTS $DJANGO_ALLOWED_HOSTS
ENV DJANGO_SECRET_KEY $DJANGO_SECRET_KEY
ENV DJANGO_CORS_ORIGIN_WHITELIST $DJANGO_CORS_ORIGIN_WHITELIST

WORKDIR /backend
COPY requirements.txt /backend/

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /backend/

#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]