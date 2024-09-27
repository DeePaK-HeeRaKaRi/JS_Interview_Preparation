// docs.google.com/document/d/1bwqgHsOWB2J-LtyG70szQQjsrwvWVlUDV-FVT-5ZlAk/edit 
// refre this doc
let arr = ["Akshay","aditya"]

let object={
    name:'akshay',
    city:'hyd',
    getIntro:function(){
        console.log(this.name + "from" +this.city)
    }
}

let object2 = {
    name:'deepak'
}

object2.__proto__ = object

Function.prototype.myownbind=function(){
    console.log('-------random message')
}
function fun(){

}

// now myownbind can be accessible anywhere in functions