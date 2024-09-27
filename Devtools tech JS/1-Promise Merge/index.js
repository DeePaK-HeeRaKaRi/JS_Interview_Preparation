const getCurrValue = (promiseType, res) => {
    let result = null
    switch (promiseType) {
        case 'string':
            result = res.reduce((prev, curr) => {
                if (typeof curr == promiseType) {
                    prev = prev + curr
                    return prev
                } else {
                    throw new TypeError('Invalid type')
                }
            }, '')
            return result
        case 'number':
            result = res.reduce((prev, curr) => {
                if (typeof curr == promiseType) {
                    prev = prev + curr
                    return prev
                } else {
                    throw new TypeError('Invalid type')
                }
            }, 0)
            return result
        case 'object':
            result = res.reduce((prev, curr) => {
                if(curr instanceof Set) {
                    throw new TypeError('Invalid type')
                }else{
                    if (typeof curr == promiseType) {
                        prev = { ...prev, ...curr }
                        return prev
                    } else {
                        throw new TypeError('Invalid type')
                    }
                }
            }, {})
            return result
        case 'array':
            result = res.reduce((prev, curr) => {
                if (Array.isArray(curr)) {
                    prev = [...prev, ...curr]
                    return prev
                } else {
                    throw new TypeError('Invalid type')
                }
            }, [])
            return result
        case 'boolean':
            result = res.reduce((prev, curr) => {
                if (typeof curr == promiseType) {
                    prev = prev && curr
                    return prev
                } else {
                    throw new TypeError('Invalid type')
                }
            }, true)
        default:
            return result

    }
}

const promiseMerge = (...promises) => {
    return new Promise((resolve, reject) => {
        let promises_type = null
        return Promise.all(promises)
            .then((res) => {
                console.log('res',res)
                if (res.length > 0) {
                    if (Array.isArray(res[0])) {
                        promises_type = 'array'
                    } else {
                        promises_type = typeof res[0]
                    }
                } else {
                    throw new TypeError('Invalid type')
                }
                console.log(promises_type)
                resolve(getCurrValue(promises_type, res))
            })
            .catch((err) => {
                reject(err)
            })
    })
}



const value = async (...args) => {
    let v = await promiseMerge(...args)
    console.log(v)
}

// value(Promise.resolve(1), Promise.resolve(2),Promise.resolve(3),Promise.resolve(4))
// value(Promise.resolve("devtools"), Promise.resolve(".tech"))
// value(Promise.resolve([1, 2, 3]), Promise.resolve([4, 5, 6]), Promise.resolve([7, 8, 9]))
// value(Promise.resolve({ a: 1 }), Promise.resolve({ b: 2 }), Promise.resolve({ c: 3 }))
// value(Promise.resolve(true), Promise.resolve(false), Promise.resolve(false))
// value(Promise.resolve("devtools"), Promise.resolve(1))
// value(Promise.resolve("devtools"), Promise.resolve([1, 2]))

value(Promise.resolve(new Set()),Promise.resolve(new Set()))
// value()
// value(Promise.resolve(1), Promise.resolve(false))

// const value =await promiseMerge(Promise.resolve(1), Promise.resolve(2),Promise.resolve(3));
// => 3

// const value = await promiseMerge(Promise.resolve("devtools"), Promise.resolve(".tech"));
// => devtools.tech

// const value = await promiseMerge(Promise.resolve([1, 2, 3]), Promise.resolve([4, 5, 6]), Promise.resolve([7, 8, 9]));
// => [1,2,3,4,5,6,7,8,9]

// const value = await promiseMerge(Promise.resolve({ a: 1 }), Promise.resolve({ b: 2 }), Promise.resolve({ c: 3 }));
// => { a: 1, b: 2, c: 3};

// const value = await promiseMerge(Promise.resolve(true), Promise.resolve(false));
// => false

// const value = await promiseMerge(Promise.resolve("devtools"), Promise.resolve(1));
// => rejects with TypeError

// const value = await promiseMerge(Promise.resolve("devtools"), Promise.resolve([1, 2]));
// => rejects with TypeError

// const value = await promiseMerge();
// => rejects with TypeError