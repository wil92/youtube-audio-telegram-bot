#!/usr/bin/env bash

HELP=$(cat <<-END
Description:
  Start script for init the bot in Docker

Preconditions:
  docker
  docker-compose

Conditions:

  Expose the environment variable:
    Before run the script, expose the variable BOT_SECRET
    example: export BOT_SECRET=tokenExample

  Using environment file:
    1. Create a .env file in the project.
    2. Add the line (replace the bot-secret by the real one)
      BOT_SECRET=<bot-secret>

  Using the script params:
    Replace the bot-secret for the real one
    example: ./start-docker.sh <bot-secret>

END
)

if [ "$1" == "help" ] || [ "$1" == "-h" ] || [ "$1" == "h" ]; then

  echo "$HELP"

else

  if [ -f .env ]; then export $(cat .env | xargs); fi

  if [ -n "$1" ]; then export "BOT_SECRET=$1"; fi

  env | grep BOT_SECRET

  docker-compose up -d --build

fi
