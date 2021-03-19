import assert from 'assert/strict'
import { identicon } from '.'

const COLLISION_TESTS_NUMBER = 10_000

function randomUsername() {
    return Math.random().toString(36).substring(2)
}

console.time("\nTests duration")

// identicon tests

assert.equal(identicon(""), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="#"></svg>')
assert.equal(identicon("foo"), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="#2e3192"><rect x="1" y="1" width="1" height="1"/><rect x="2" y="0" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/></svg>')


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
