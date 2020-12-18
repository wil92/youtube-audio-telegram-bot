const FACTOR = 1024;

function roundOneDecimal(value) {
    return Math.round(value * 10) / 10;
}

module.exports = function (sizeInBytes) {
    if (sizeInBytes < 100) {
        return roundOneDecimal(sizeInBytes) + "B";
    }
    if (sizeInBytes < 100 * FACTOR) {
        return roundOneDecimal(sizeInBytes / FACTOR) + "KB";
    }
    if (sizeInBytes < 100 * FACTOR * FACTOR) {
        return roundOneDecimal(sizeInBytes / FACTOR / FACTOR) + "MB";
    }
    return roundOneDecimal(sizeInBytes / FACTOR / FACTOR / FACTOR) + "GB";
};
