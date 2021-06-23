export function toMP3(value: string = '') {
    return value.trim().replace(/\.\w+$/, '.mp3');
}
