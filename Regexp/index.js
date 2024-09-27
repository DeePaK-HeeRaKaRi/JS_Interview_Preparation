let reg=/harry/g
// i- case insensitivity -> harry -> [Harry,HaRRY] will also match
// g globally
console.log(reg)
console.log(reg.source);
let s='This is a great code with harry and harry is a good programmer'
let res=reg.exec(s)
console.log(res)

console.log(reg.test(s)) //return true if found else false

// console.log(reg.match(s)) //wrong syntax
let res1=s.match(reg) //if g is kept then only it will return array
console.log('match',res1)

let res2=s.search(reg) //gives the first index of match
console.log(res2)

let res3=s.replace('great','[GREAT REPLACED WITH -> Deepak]')
console.log(res3)

let r=/^h/i

let s1='HarrdcI is my captaim eEpak'
 
console.log('starts with',r.test(s1)) //true

let e=/eepak$/i
console.log('ends with',e.test(s1)) //true

//matches exactly with one character
let o=/dee.ak/i
let s2='iam deePak is a good programmer'   
console.log('single character',o.test(s2))

// matches with 0 or more character
let m=/dee.*pak/
let s3='iam deerrpak is a good programmer' 
console.log('more characters',m.test(s3))

// optional character
let opt=/ha?rryi?/
let s4='harry is a good boy'
console.log('optional character--',opt.test(s4))

// Character Sets
//[a-z] anyone character
let r2=/h[a-zA-Z]rry/
let s5='hBrry is a good boy'


console.log('character sets',r2.test(s5))
// only specified characetrs in braces
let r3=/h[bxy]rry/

// [^aty] -> after h it should not have a or t ot y
let r4=/h[^aty]rr[yab]/

r4=/h[^a-z]rr[y]/

let s6='h-rry is good'
console.log('not----',r4.test(s6))

// quantifiers
let h='haRry is a good programmer'

// r occurs 2 times -> harry
let q1=/har{2}y?/i
console.log('quantifiers---',q1.test(h))

// r may occur 0 or 1 or 2 times
let q2=/har{0,2}y?/i
console.log('quantifiers---',q2.test(h))

// GROUPINGS
let g='the harharBhai was a good'
let g1=/(har){2}bhai/i
console.log('groupings--1',g1.test(g))

let g2=/(har){2}(0r){0,3}/g
let t='the harhar0r0r0r'
console.log('groupings--2',g2.test(t))

