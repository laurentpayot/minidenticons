import { identicon } from './identicon.js'

export const identiconSvg =
    customElements.define('identicon-svg',
        class extends HTMLElement {
            // things required by custom elements
            constructor() { super() }
            connectedCallback() { this.identiconSvg() }
            attributeChangedCallback() { this.identiconSvg() }
            static get observedAttributes() { return ['username'] }
            // set the identicon svg based on username
            identiconSvg() {
                this.innerHTML = identicon(this.getAttribute('username'))
            }
        }
    )
