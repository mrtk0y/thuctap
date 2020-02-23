FROM node:12.16.1-stretch

RUN apt update && apt install -y \
  vim \
  nano 

WORKDIR /ThucTap
COPY package*.json ./
COPY . /ThucTap

# RUN apk add --no-cache make gcc g++ python && \
#   npm install && \
#   npm rebuild bcrypt --build-from-source && \
#   apk del make gcc g++ python

RUN npm install

EXPOSE 3000

CMD [ "node", "app.js" ]