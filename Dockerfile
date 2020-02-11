FROM alpine

RUN apk update
RUN apk add curl
RUN apk add --update npm
RUN apk add vim \
  nano

WORKDIR /ThucTap
COPY . /ThucTap


