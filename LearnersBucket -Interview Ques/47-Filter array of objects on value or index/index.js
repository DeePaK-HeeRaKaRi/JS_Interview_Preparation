
const filterObject=(arr,filter)=>{
    console.log(arr,filter)
    if(typeof filter == "string"){
        for(const entry of arr){
            // console.log("entry",entry)
            if(Array.isArray(entry)){
                // console.log("array",entry)
                return filterObject(entry,filter)
            }else{
                // console.log("else part")
                for(const [key,val] of Object.entries(entry)){
                    // console.log(key,val)
                    if(typeof val =='object'){
                        return filterObject([val],filter)
                    }else if(!Array.isArray(val) && val===filter){
                        // console.log("satisfied")
                        return entry
                }
            }
            }
        
            // const res=Object.entries(entry)
            // console.log(res)
            // console.log(entry)
        }
    }else if(typeof filter == "number"){
        return filter>=0 && filter<arr.length ? arr[filter] : undefined
    }else{
        return undefined
    }

}
const arr = [
    { name: "Amir", id: "1" ,stundent:{name:'Deepak',id:100}},
    { name: "Samlan", id: "2" },
    { name: "Shahrukh", id: "0" },
    {name:"Amir",id:9},
    [{name:"Deepak",id:10},{name:"madhu",id:11}]
];
// console.log(filterObject(arr, "Deepak"))
// console.log(filterObject(arr, 4)); 
console.log(filterObject(arr, "Amir")); 
// console.log(filterObject(arr, "0")); 