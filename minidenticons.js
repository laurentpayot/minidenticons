const COLORS = [ '#d4145a', '#8e78ff', '#ff7300', '#fbb03b', '#ed1e79', '#019244', '#ed1c23', '#2e3192', '#fc7d7b', '#fecc00', '#3aa17e', '#4f00bc', '#09c9be', '#662d8c', '#00a8c5', '#1353ae' ]
const COLORED_SQUARE_DENSITY = 4

const FNV_PRIME = 16777619
const OFFSET_BASIS = 2166136261


function pseudoFNV1a(str) {
    return str
        .split('')
        .map(char => char.charCodeAt(0))
        .reduce((hash, code) => ((hash ^ code) >>> 0) * FNV_PRIME, OFFSET_BASIS)
}

export function identicon(str) {
    const hash = pseudoFNV1a(str)
    const color = COLORS[(hash / FNV_PRIME) % COLORS.length] || ''
    const rects = !str ? [] : [...Array(25).keys()]
        .map(i => hash % (16 - i % 15) < COLORED_SQUARE_DENSITY ?
            `<rect x="${i > 14 ? 7 - ~~(i/5) : ~~(i/5)}" y="${i % 5}" width="1" height="1"/>` : '')
        .join('')
    return `<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="${color}">${rects}</svg>`
}
