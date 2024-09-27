let html='deepak'
let a=html.concat(' ','kUMmar',' ','heerakari')
// count including spaces
console.log(a.length)
console.log(a)
console.log(a.toLowerCase())
console.log(a.toUpperCase())
// indexof -> starts with if not their its prints -1
console.log(a.indexOf('ma',0))
// ,0 is where to start i.e,. we can keep from any number from where to start
console.log(a.indexOf('p',0))
console.log(a.lastIndexOf('a'))

// charAt -> prints the index letter
console.log(a.charAt(3))

// includes -> if their isin the given string or not else prints false
console.log(a.includes('heer'))
console.log(a.includes('ira'))

console.log(a.endsWith('kari'))
console.log(a.startsWith('dee'))
console.log("sub is",a.substring().split(' '))
console.log('split')
console.log("jj",a.substring(4,8).split(' '))
t1=a.substring(4,8).split(' ')
console.log(t1.length)
console.log(a.split('a'))
console.log("space",a.split(' '))
console.log(a.replace('ak','replaced').split(' '))

let f='orange'
let f1='apple'
let myHtml=`Hello ${a}

            <p>You like ${f} and ${f1}</p> 
            `
document.body.innerHTML=myHtml