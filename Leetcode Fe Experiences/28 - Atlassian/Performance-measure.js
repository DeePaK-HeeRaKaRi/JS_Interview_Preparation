
//Performance measuring function

async function measurePerformance(fn, options = {}) {
    const {
        name = fn.name || 'Anonymous Function',
        iterations = 1,
        warmUp = true,
        logResults = true // Flag to log results
    } = options

    const result = {
        name,
        iterations,
        isAsync : fn.constructor.name === 'AsyncFunction',
        timings : [], // how much duration it took to evulate
        averageTime : 0,
        min: Infinity,
        max: -Infinity,
        total: 0
    }
 
    if(warmUp) {
        try {
            await fn()  // if we keep await for sync function it will run instantly no waiting time
        }
        catch(err) {
            console.error("Error during warm-up:", name)
        }
    }

    for(let  i=0; i< iterations; i++) {
        const start = performance.now()
        try {
            await fn()  // if we keep await for sync function it will run instantly no waiting time
        }
        catch(err) {
            console.error("Error during iteration:", name)
            continue
        }
        const end = performance.now()
        const duration = end - start

        result.timings.push(duration)
        result.total += duration

        result.min = Math.min(result.min, duration)
        result.max = Math.max(result.max, duration)
    }

    result.averageTime = result.total / result.timings.length //if we get any error during execution we may have less timings than iterations

    if(logResults) {
        console.log('---------------------------')
        console.log(`Performance Results for: ${name}`)
        console.log(`Iterations: ${result.iterations}`)
        console.log(`Average Time: ${result.averageTime} ms`)
        console.log(`Min Time: ${result.min} ms`)
        console.log(`Max Time: ${result.max} ms`)
        console.log(`Total Time: ${result.total} ms`)
        console.log('---------------------------')
    }

    return result
}

//Async function
const asyncFunction = async() => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return "Done executing async function"
}

measurePerformance(asyncFunction, {   
        name: 'Async Function', 
        iterations: 5, 
        warmUp: true
    }
)
//Normal Function
const syncFunction = () => {
    let sum = 0
    for(let i=0; i< 1000000; i++) {
        sum += i
    }
    return sum
}


measurePerformance(asyncFunction, {   
        name: 'Sync Function', 
        iterations: 5, 
        warmUp: true
    }
)
