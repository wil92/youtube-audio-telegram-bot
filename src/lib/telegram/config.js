module.exports = {
  botSecret: process.env.BOT_SECRET,
  updateInterval: process.env.UPDATES_INTERVAL || 10000,
  telegramHost: 'api.telegram.org',
  regexpYoutubeLink: /((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?/
}
