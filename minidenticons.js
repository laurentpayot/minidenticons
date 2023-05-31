// 12 different hue colors only for easy distinction
const COLORS_NB = 12
const DEFAULT_SATURATION = 50
const DEFAULT_LIGHTNESS = 50


// based on the FNV-1a hash algorithm (using `>>> 0` for 32 bit unsigned integer conversion)
// http://www.isthe.com/chongo/tech/comp/fnv/index.html
/**
 * @type {(str: string) => number}
 */
function simpleHash(str) {
    return str.split('')
        .reduce((hash, char) => (((hash ^ char.charCodeAt(0)) >>> 0) * 16777619) >>> 0, 2166136261)
        // disregarding last 4 bits for better randomness
        >>> 4
}

/**
 * @type {import('.').identicon}
 */
export function identicon(username="", saturation=DEFAULT_SATURATION, lightness=DEFAULT_LIGHTNESS) {
    const hash = simpleHash(username)
    // console.log("%c" + hash.toString(2).padStart(32, "0"), "font-family:monospace") // uncomment to debug
    const hue = (hash % COLORS_NB) * (360 / COLORS_NB)
    return [...Array(username ? 25 : 0)].reduce((acc, e, i) =>
        // testing the 15 lowest weight bits of the hash
        hash & (1 << (i % 15)) ?
            acc + `<rect x="${i > 14 ? 7 - ~~(i / 5) : ~~(i / 5)}" y="${i % 5}" width="1" height="1"/>`
        : acc,
        // xmlns attribute added in case of SVG file generation https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg#sect1
        `<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(${hue} ${saturation}% ${lightness}%)">`
    )
    + '</svg>'
}

/**
 * @type {void}
 */
export const identiconSvg =
    // declared as a pure function to be tree-shaken by the bundler
    /*@__PURE__*/globalThis.customElements?.define('identicon-svg',
        class IdenticonSvg extends HTMLElement {
            static observedAttributes = ['username', 'saturation', 'lightness']
            // private fields to allow Terser mangling
            static #memoized = {}
            #isConnected = false
            connectedCallback() {
                this.#setContent()
                this.#isConnected = true
            }
            // attributeChangedCallback() is called for every observed attribute before connectedCallback()
            attributeChangedCallback() { if (this.#isConnected) this.#setContent() }
            #setContent() {
                const args = IdenticonSvg.observedAttributes
                                .map(key => this.getAttribute(key) || undefined)
                const memoKey = args.join(',')
                this.innerHTML = IdenticonSvg.#memoized[memoKey] ??=
                    // @ts-ignore
                    identicon(...args)
            }
        }
    )
