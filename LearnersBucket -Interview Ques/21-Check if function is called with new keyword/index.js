function foo(){
    if(new.target){
        console.log('Called with new Keyword-as constructor',new.target)
    }
    else{
        console.log('Called withot new keyword-normal function invocation',new.target)
    }
}
foo()
let t=new foo()


// console.log(new.target)