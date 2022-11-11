[![codecov](https://codecov.io/gh/wil92/youtube-audio-telegram-bot/branch/master/graph/badge.svg?token=PN6ABNY03S)](https://codecov.io/gh/wil92/youtube-audio-telegram-bot)
[![Node.js CI](https://github.com/wil92/youtube-audio-telegram-bot/actions/workflows/node.js.yml/badge.svg)](https://github.com/wil92/youtube-audio-telegram-bot/actions/workflows/node.js.yml)

# Youtube upload audio bot (Telegram)

This is a simple telegram bot that given a youtube link shared in a telegram channel, download the video, extract the
 audio and publish it back in the channel.

![](./example-image.png)

## Install dependencies

```
npm install
```

## Start locally

- Install [youtube-dl](https://github.com/ytdl-org/youtube-dl) ffmpeg
- Build project: `npm run build`
- Start project: `./run.sh <bot-token>`
  tip: Create bot and get token by https://t.me/BotFather
 

## Start project with docker

```
# first build the project
npm run build

# then start the docker container with the script
./start-docker.sh <bot-secret>

# to see options, use this command
./start-docker.sh -h
```

## Running tests

```
npm test

# with coverage
npm run test:cov
```

## Dependencies used in the project

- youtube-dl
- node
- npm

## Contributors

- [wil92](https://github.com/wil92)
- [eduinlight](https://github.com/eduinlight)
- [frarteaga](https://github.com/frarteaga)
