#!/usr/bin/env sh

set -x
apk update
apk add --no-cache ca-certificates curl dumb-init ffmpeg gnupg python3 nodejs npm
