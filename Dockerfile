FROM alpine:3.12

# https://github.com/Yelp/dumb-init/releases
ARG DUMB_INIT_VERSION=1.2.2

COPY scrips/* /

RUN ./install-dependencies.sh
RUN ./install-youtube-dl.sh

# Requires python -> python3.
RUN ln -s /usr/bin/python3 /usr/bin/python

# Clean-up
RUN rm youtube-dl.sig
RUN apk del curl gnupg

# Create directory to hold downloads.
RUN mkdir /downloads
RUN chmod a+rw /downloads

# Sets up cache.
RUN mkdir /.cache
RUN chmod 777 /.cache

ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt

WORKDIR /downloads

COPY package.json /downloads
COPY package-lock.json /downloads

RUN npm install --production

COPY lib/ /downloads/lib
COPY main.js /downloads

# Basic check.
RUN dumb-init youtube-dl --version

ENTRYPOINT ["node", "main.js"]
CMD ["--help"]
