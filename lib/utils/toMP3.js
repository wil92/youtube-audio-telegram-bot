module.exports = function (value = '') {
    return value.replace(/^\s+/, '')
        .replace(/\s+$/, '')
        .replace(/\.\w+$/, '.mp3');
};
