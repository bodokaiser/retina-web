FROM alpine:edge

ADD . /srv

RUN apk add -U -X http://nl.alpinelinux.org/alpine/edge/testing/ iojs git

ENV GITHUB_USERNAME bodokaiser
ENV GITHUB_PASSWORD cfb0b73ad7fe9f60bbb47725a772731f5ad6274b

WORKDIR /srv

RUN npm install

CMD ["iojs", "lib"]

EXPOSE 3000
