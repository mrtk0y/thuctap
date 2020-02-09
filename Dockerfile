FROM alpine

RUN apk update
RUN apk add curl
RUN apk add --update npm
RUN apk add vim \
  nano
RUN apk add pug

WORKDIR /ThucTap
COPY . ~/ThucTap
