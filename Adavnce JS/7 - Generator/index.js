function* generator() {
    yield 10;
    console.log('-in generator')
}
const res = generator();
console.log(res)

console.log(res.next())
// console.log(res.next())


function* count() {
    let i =0 
    while(true) {
        console.log('Helo');
        i++
        yield i
        console.log('After')
    }
}

const cnt = count()
console.log('cnt',cnt)
console.log(cnt.next())
console.log(cnt.next())