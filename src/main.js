const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const telegram = require('./lib/telegram')
const isYoutubeLink = require('./lib/utils/isYoutubeLink')
const toMP3 = require('./lib/utils/toMP3')

const config = require('./lib/telegram/config')

let markedPost = new Set()

function getUpdates (prev = [], options = { limit: 100, allowed_updates: ['channel_post'] }) {
  return telegram.getUpdates(options)
    .then(updates => {
      if (updates.result && Array.isArray(updates.result)) {
        const results = [...prev, ...updates.result]
        if (updates.result.length === 100) {
          return getUpdates(results, {
            ...options,
            offset: updates.result[updates.result.length - 1].update_id + 1
          })
        }
        return results
      }
      return prev
    })
}

function uploadAudio (audioName, chatId) {
  return telegram.sendAudio({ chat_id: chatId }, path.join(__dirname, audioName))
}

function removeAudio (audioName) {
  fs.unlinkSync(audioName)
}

function getMessageText (elem) {
  return elem.channel_post ? elem.channel_post.text : elem.message.text
}

function getChatId (elem) {
  return elem.channel_post ? elem.channel_post.chat.id : elem.message.chat.id
}

function getMessageId (elem) {
  return elem.channel_post ? elem.channel_post.message_id : elem.message.message_id
}

function downloadYoutubeVideo (elem, options = '') {
  return new Promise((resolve, reject) => {
    exec(`youtube-dl ${options} ${getMessageText(elem)}`, (error, stdout, stderr) => {
      if (error) {
        return reject(error)
      }
      if (stderr) {
        return reject(stderr)
      }
      resolve(stdout)
    })
  })
}

function checkYoutubeLink (elem) {
  return (elem.channel_post && isYoutubeLink(elem.channel_post.text)) ||
        (elem.message && isYoutubeLink(elem.message.text))
}

function process () {
  const tmpMarkedPost = new Set()
  getUpdates().then(res => {
    return res.reduce((prev, elem) => {
      tmpMarkedPost.add(elem.update_id)
      if (checkYoutubeLink(elem) && !markedPost.has(elem.update_id)) {
        return prev
          .then(() => downloadYoutubeVideo(elem, '-x --audio-format mp3 --audio-quality 8 -q'))
          .then(() => downloadYoutubeVideo(elem, '--get-filename'))
          .then(async (fileName) => {
            fileName = toMP3(fileName)
            console.log(fileName)
            return telegram.deleteMessage({ chat_id: getChatId(elem), message_id: getMessageId(elem) })
              .then(() => telegram.sendMessage({ chat_id: getChatId(elem), text: getMessageText(elem) }))
              .then(() => uploadAudio(fileName, getChatId(elem)))
              .then(() => removeAudio(path.join(__dirname, fileName)))
          }).catch(console.error)
      } else if (!checkYoutubeLink(elem)) {
        console.info(`Not valid youtube link in the update number: ${elem.update_id}`)
      }
      return prev
    }, Promise.resolve())
  }).then(() => {
    markedPost = tmpMarkedPost
    setTimeout(process, config.updateInterval)
  })
}

getUpdates().then(res => {
  res.forEach(elem => {
    if (checkYoutubeLink(elem)) {
      markedPost.add(elem.update_id)
    }
  })
  setTimeout(process, config.updateInterval)
})
