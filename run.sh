#!/usr/bin/env sh

if [ -f .env ]
then
    export $(cat .env | xargs)
fi

node ./dist/main.js
