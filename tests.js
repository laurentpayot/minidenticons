import assert from 'assert/strict'
import { identicon } from './minidenticons.min.js'
// import { identicon } from './no-custom-element.min.js'


const COLLISION_TESTS_NUMBER = 10_000

function randomUsername() {
    return Math.random().toString(36).substring(2)
}

console.time("\nTests duration")

// identicon tests

// non-integer hue normal for empty string
assert.equal(identicon(""), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(62.17362189473988 50% 50%)"></svg>')
assert.equal(identicon("foo"), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(60 50% 50%)"><rect x="1" y="1" width="1" height="1"/><rect x="2" y="0" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/></svg>')
assert.equal(identicon("foo", 75), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(60 75% 50%)"><rect x="1" y="1" width="1" height="1"/><rect x="2" y="0" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/></svg>')
assert.equal(identicon("foo", undefined, 75), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(60 50% 75%)"><rect x="1" y="1" width="1" height="1"/><rect x="2" y="0" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/></svg>')
assert.equal(identicon("alienHead66"), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(0 50% 50%)"><rect x="0" y="0" width="1" height="1"/><rect x="0" y="2" width="1" height="1"/><rect x="1" y="1" width="1" height="1"/><rect x="1" y="3" width="1" height="1"/><rect x="1" y="4" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="4" y="0" width="1" height="1"/><rect x="4" y="2" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/><rect x="3" y="4" width="1" height="1"/></svg>')

for (let saturation = 0; saturation < 100; saturation += 5) {
    for (let lightness = 0; lightness < COLLISION_TESTS_NUMBER; lightness += 5) {
        assert.equal(
            identicon("foo", saturation, lightness),
            `<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(60 ${saturation}% ${lightness}%)"><rect x="1" y="1" width="1" height="1"/><rect x="2" y="0" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/></svg>`
        )
    }
}


// collision tests

const usernames = new Set() // to ensure no duplicate random username
const identicons = new Set()
for (let i = 0; i < COLLISION_TESTS_NUMBER; i++) {
    const username = randomUsername()
    usernames.add(username)
    identicons.add(identicon(username))
    if ((i + 1) % ~~(COLLISION_TESTS_NUMBER / (i < (COLLISION_TESTS_NUMBER / 10) ? 100 : 10)) === 0)
        console.log(`${usernames.size - identicons.size} collisions out of ${usernames.size}`,
                    `(${((usernames.size - identicons.size)/usernames.size * 100).toFixed(2)}%)`)
}

console.timeEnd("\nTests duration")
