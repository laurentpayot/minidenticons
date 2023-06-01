import assert from 'assert/strict'

import { randomString } from './benchmark/benchmark.js'

import { minidenticon as minidenticon_CE } from './minidenticons.min.js'
import { minidenticon as minidenticon_NO_CE } from './no-custom-element.min.js'


const COLLISION_TESTS_NUMBER = 10_000

console.time("\nTests duration")

// minidenticon tests // TODO !!!!!!!!!!!!!!!!!!!!

// new Array(minidenticon_CE, minidenticon_NO_CE).forEach(minidenticon => {

//     // non-integer hue normal for empty string
//     assert.equal(minidenticon(""), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(273.2604328421098 50% 50%)"></svg>')
//     assert.equal(minidenticon("foo"), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(90 50% 50%)"><rect x="1" y="1" width="1" height="1"/><rect x="2" y="0" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/></svg>')
//     assert.equal(minidenticon("foo", 75), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(90 75% 50%)"><rect x="1" y="1" width="1" height="1"/><rect x="2" y="0" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/></svg>')
//     assert.equal(minidenticon("foo", undefined, 75), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(90 50% 75%)"><rect x="1" y="1" width="1" height="1"/><rect x="2" y="0" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/></svg>')
//     assert.equal(minidenticon("alienHead66"), '<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(180 50% 50%)"><rect x="0" y="0" width="1" height="1"/><rect x="0" y="2" width="1" height="1"/><rect x="1" y="1" width="1" height="1"/><rect x="1" y="3" width="1" height="1"/><rect x="1" y="4" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="4" y="0" width="1" height="1"/><rect x="4" y="2" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/><rect x="3" y="3" width="1" height="1"/><rect x="3" y="4" width="1" height="1"/></svg>')

//     for (let saturation = 0; saturation < 100; saturation += 5) {
//         for (let lightness = 0; lightness < COLLISION_TESTS_NUMBER; lightness += 5) {
//             assert.equal(
//                 minidenticon("foo", saturation, lightness),
//                 `<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(90 ${saturation}% ${lightness}%)"><rect x="1" y="1" width="1" height="1"/><rect x="2" y="0" width="1" height="1"/><rect x="2" y="1" width="1" height="1"/><rect x="2" y="2" width="1" height="1"/><rect x="2" y="3" width="1" height="1"/><rect x="2" y="4" width="1" height="1"/><rect x="3" y="1" width="1" height="1"/></svg>`
//             )
//         }
//     }

// })

// collision tests

const minidenticon = minidenticon_CE

const seeds = new Set() // to ensure no duplicate random seed
const minidenticons = new Set()
for (let i = 0; i < COLLISION_TESTS_NUMBER; i++) {
    const seed = randomString(15)
    seeds.add(seed)
    minidenticons.add(minidenticon(seed))
    if ((i + 1) % ~~(COLLISION_TESTS_NUMBER / (i < (COLLISION_TESTS_NUMBER / 10) ? 100 : 10)) === 0)
        console.log(`${seeds.size - minidenticons.size} collisions out of ${seeds.size}`,
                    `(${((seeds.size - minidenticons.size)/seeds.size * 100).toFixed(2)}%)`)
}

console.timeEnd("\nTests duration")
