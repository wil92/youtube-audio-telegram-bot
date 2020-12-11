module.exports = function (value = '') {
    return value.startsWith('https://www.youtube.com/') || value.startsWith('https://m.youtube.com/');
};
