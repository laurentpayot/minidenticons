import assert from 'assert/strict'
import { identicon } from './minidenticons.js'

console.time("Tests")

assert.equal(identicon(""), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill=""></svg>')
assert.equal(identicon("foo"), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="#2e3192"><rect x="1" y="1" width="1" height="1"/><rect x="2" y="0" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/></svg>')

console.timeEnd("Tests")
