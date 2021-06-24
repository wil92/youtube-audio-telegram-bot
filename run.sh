#!/usr/bin/env sh

if [ -f .env ]
then
    export $(cat .env | xargs)
fi

if [ -n "$1" ]; then export "BOT_SECRET=$1"; fi

node ./dist/main.js
