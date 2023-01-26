FROM node:16.6.2
USER root

# Create app directory
WORKDIR /frontend
COPY . /frontend

ENV PATH /app/node_modules/.bin:$PATH

ENV REACT_APP_HOST_IP_ADDRESS $API_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

RUN npm run build
