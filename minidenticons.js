const COLORS = 'd4145a 8e78ff ff7300 fbb03b ed1e79 019244 ed1c23 2e3192 fc7d7b fecc00 3aa17e 4f00bc 09c9be 662d8c 00a8c5 1353ae'
                .split(' ')
const SQUARE_DENSITY = 4 // density of 4 for the lowest probability of collision

// 32 bit FNV-1a hash parameters
const FNV_PRIME = 16777619
const OFFSET_BASIS = 2166136261


// FNV1a-like hash function http://www.isthe.com/chongo/tech/comp/fnv/index.html
function pseudoFNV1a(str) {
    return str
        .split('')
        .map(char => char.charCodeAt(0))
        // >>> 0 for 32 bit unsigned integer conversion https://2ality.com/2012/02/js-integers.html
        .reduce((hash, code) => ((hash ^ code) >>> 0) * FNV_PRIME, OFFSET_BASIS)
}

export function identicon(username) {
    const hash = pseudoFNV1a(username)
    // dividing hash by FNV_PRIME to get last XOR result for better color randomness
    const color = COLORS[(hash / FNV_PRIME) % COLORS.length] || ''
    const rects = username ? [...Array(25).keys()]
        // 2 + ((3 * 5 - 1) - modulo) to concentrate squares at the center
        .map(i => hash % (16 - i % 15) < SQUARE_DENSITY ?
            `<rect x="${i > 14 ? 7 - ~~(i/5) : ~~(i/5)}" y="${i % 5}" width="1" height="1"/>` : '')
        .join('')
        : []
    return `<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="#${color}">${rects}</svg>`
}

export const identiconSvg =
    globalThis.customElements && /*@__PURE__*/customElements.define('identicon-svg',
        class extends HTMLElement {
            constructor() { super() }
            connectedCallback() { this.identiconSvg() }
            attributeChangedCallback() { this.identiconSvg() }
            static get observedAttributes() { return ['username'] }
            identiconSvg() {
                this.innerHTML = identicon(this.getAttribute('username'))
            }
        }
    )
