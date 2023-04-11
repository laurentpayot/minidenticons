import { identicon } from '../minidenticons.min.js'
import { benchmark, randomString } from './benchmark.js'

const TEST_NB = 5_000
const RUN_NB = 10
const USERNAME_LENGTH = 15

const averageRunDuration = benchmark(
    (username) => identicon(username),
    () => [ randomString(USERNAME_LENGTH) ],
    (run) => console.log(`Run ${run} of ${RUN_NB}…`),
    TEST_NB,
    RUN_NB
)

console.log(
    `\nTime to generate ${
        TEST_NB
    } identicon SVG strings for ${
        USERNAME_LENGTH
    } characters random usernames:\n${
        Math.round(averageRunDuration)
    } milliseconds (${
        RUN_NB
    } runs average)\n`)
