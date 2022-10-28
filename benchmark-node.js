import { identicon } from './minidenticons.min.js'


const USERNAME_LENGTH = 10
const IDENTICONS_PER_PAGE = 300
const RUNS_NUMBER = 1_000

function randomUsername() {
    return Math.random().toString(36).substring(2).padEnd(USERNAME_LENGTH, "0")
}

const durations = []
let username, t0, t1
for (let i = 0; i < IDENTICONS_PER_PAGE * RUNS_NUMBER; i++) {
    username = randomUsername()
    t0 = performance.now()
    identicon(username)
    t1 = performance.now()
    durations.push(t1 - t0)
}

const averageRunDuration =
    durations.reduce((acc, d) => acc +d, 0) / RUNS_NUMBER

console.log(
    `\nTime to generate ${
        IDENTICONS_PER_PAGE
    } identicons for ${
        USERNAME_LENGTH
    } characters usernames:\n${
        averageRunDuration.toFixed(3)
    } milliseconds (${
        RUNS_NUMBER
    } runs average)\n`)
