const merge=(...arguments)=>{
    // console.log(arguments)
    let target={}
    // target[name]='deepak'
    
    let merger=(prop)=>{
      for(let p in prop){
        if(prop.hasOwnProperty(p)){
          target[p]=prop[p]
        }
      }
    }
    for(let prop of arguments){
      merger(prop)
    }
    return target
  }
  let obj1={
    name:'deepak',
    age:23
  }
  let obj2={
    qualification:'btech',
    company:'mindtree'
  }
   
  let res=merge(obj1,obj2)
  console.log('result',res)