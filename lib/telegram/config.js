module.exports = {
    botSecret: process.env['BOT_SECRET'],
    updateInterval: process.env['UPDATES_INTERVAL'] || 20000,
    telegramHost: 'api.telegram.org'
};
