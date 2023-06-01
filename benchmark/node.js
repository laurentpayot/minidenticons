import { minidenticon } from '../minidenticons.min.js'
import { benchmark, randomString } from './benchmark.js'

const TEST_NB = 10_000
const RUN_NB = 10
const SEED_LENGTH = 15

const averageRunDuration = benchmark(
    (username) => minidenticon(username),
    () => [ randomString(SEED_LENGTH) ],
    (run) => console.log(`Run ${run} of ${RUN_NB}…`),
    TEST_NB,
    RUN_NB
)

console.log(
    `\nTime to generate ${
        TEST_NB
    } minidenticon SVG strings for ${
        SEED_LENGTH
    } characters random seeds:\n${
        Math.round(averageRunDuration)
    } milliseconds (${
        RUN_NB
    } runs average)\n`)
