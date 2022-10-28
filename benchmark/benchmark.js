import { identicon } from '../minidenticons.min.js'

export const USERNAME_LENGTH = 15
export const IDENTICONS_PER_PAGE = 300
export const RUNS_NUMBER = 100

function randomUsername(length) {
    let str = ""
    while (str.length < length) {
        str += Math.random().toString(36).substring(2)
    }
    return str.substring(0, length)
}

export function benchmark() {
    const durations = []
    let username, t0, t1
    for (let i = 0; i < IDENTICONS_PER_PAGE * RUNS_NUMBER; i++) {
        username = randomUsername(USERNAME_LENGTH)
        t0 = performance.now()
        identicon(username)
        t1 = performance.now()
        durations.push(t1 - t0)
    }
    const averageRunDuration = durations.reduce((acc, d) => acc +d, 0) / RUNS_NUMBER
    return averageRunDuration
    }
