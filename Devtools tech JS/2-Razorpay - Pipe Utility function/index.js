
function pipe(...args) {
    let res 
    const inner = (val) => {
        res = val
        for(let fn of args) {
            res = fn.call(this,res)
            console.log('----------val',res)
        }
        return res
    }
    return inner
}
const getName = (object) => object.name;
const makeUpperCase = (string) => string.toUpperCase();
const slice = (string) => string.slice(0, 3);

const method = pipe(getName, makeUpperCase, slice);

const value = method({ name: 'devtools' });

console.log(value);