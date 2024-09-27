// function example(){
//     this.blog="learnersBucket"
//     this.display=() => {
//         console.log("displaying the blog")
//     }
// }
// example()
// console.log(this.blog)
// this.blog="deepak"
// console.log(this.blog)

const example={
    blog:'deepak',
    display:function(){
        
        console.log(this == example)
        console.log('------',this.blog)
    }
}
console.log(example.blog);
example.display()
example.blog='kumar'

console.log(example.blog);
example.display();