export function benchmark(testFn, testArgsFn , breakFn, testNb=100, runNb=10) {
    const durations = []
    let t0, t1, args
    [...Array(runNb)].forEach((_, i) => {
        breakFn?.(i + 1)
        ;[...Array(testNb)].forEach(() => {
            args = testArgsFn()
            t0 = performance.now()
            testFn(...args)
            t1 = performance.now()
            durations.push(t1 - t0)
        })
    })
    const averageRunDuration = durations.reduce((acc, d) => acc + d, 0) / runNb
    return averageRunDuration
}

export function randomString(length) {
    let str = ""
    while (str.length < length) {
        str += Math.random().toString(36).substring(2)
    }
    return str.substring(0, length)
}
