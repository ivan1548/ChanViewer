import {
    reduce,
    range
} from "rambda";

export function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]})`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

export function randomString(n) {
    const times = range(0, Math.ceil(n / 36));

    return reduce((acc, x) => {
        return acc + Math.random().toString(36)
    }, "", times).substring(2, n);
}