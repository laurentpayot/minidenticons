import { USERNAME_LENGTH, IDENTICONS_PER_PAGE, RUNS_NUMBER, benchmark } from './benchmark.js'


const averageRunDuration = benchmark()

console.log(
    `\nTime to generate ${
        IDENTICONS_PER_PAGE
    } identicons for ${
        USERNAME_LENGTH
    } characters random usernames:\n${
        Math.round(averageRunDuration)
    } milliseconds (${
        RUNS_NUMBER
    } runs average)\n`)
