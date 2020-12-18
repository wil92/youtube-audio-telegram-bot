module.exports = function (value = '') {
    return value.startsWith('https://www.youtube.com') ||
        value.startsWith('https://youtube.com') ||
        value.startsWith('https://m.youtube.com') ||
        value.startsWith('https://youtu.be');
};
