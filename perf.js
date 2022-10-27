import { identicon } from './minidenticons.min.js'


const IDENTICONS_PER_PAGE = 300
const RUNS_NUMBER = 1_000
// constant username for performance consistency
const USERNAME = "AbCdE12345"

const durations = []
let t0, t1
for (let i = 0; i < IDENTICONS_PER_PAGE * RUNS_NUMBER; i++) {
    t0 = performance.now()
    identicon(USERNAME)
    t1 = performance.now()
    durations.push(t1 - t0)
}

const averageRunDuration =
    durations.reduce((acc, d) => acc +d, 0) / RUNS_NUMBER

console.log(
    `\Time to generate ${
        IDENTICONS_PER_PAGE
    } identicons for a ${
        USERNAME.length
    } characters username:\n${
        averageRunDuration.toFixed(3)
    } milliseconds (${
        RUNS_NUMBER
    } runs average)\n`)
