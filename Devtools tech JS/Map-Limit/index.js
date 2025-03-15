/**
 * Read FAQs section on the left for more information on how to use the editor
**/
/** Do not delete or change any function name **/
Array.prototype.chop = function(size) {
    let arr = [...this]
    if(!size || arr.length == 0 || size > arr.length) {
      return [arr]
    }
  
    let output = []
    let i = 0
    while(i<arr.length){
      let curr = arr.slice(i,i+size)
      output.push(curr)
      i+=size
    }
    return output
  }
  function getUserById(id, callback) {
    // simulating async request
    const randomRequestTime = Math.floor(Math.random() * 100) + 200;
   
    setTimeout(() => {
      callback("User" + id)
    }, randomRequestTime);
  }
  let res = []
  
function mapLimit(inputs, limit, iterateeFn, callback) {
    // write your solution here
      let chopped_arr = inputs.chop(limit)
       
      let final = chopped_arr.reduce((prev,curr) => {
        // [[1,2],[3,4],[5]]
        return prev.then((res)=>{
          const sub_arr_result = new Promise((resolve,reject) => {
            let curr_result = []
            curr.forEach((val,index) => {
              let tasksCompleted = 0 
              iterateeFn(val,(val1) => {
                console.log('val1:',val1)
                curr_result.push(val1)
                console.log({curr_result})
                if(index == curr.length-1){
                  resolve([...res,...curr_result])
                }
              })
            }) 
          })
          return sub_arr_result
        })
      },Promise.resolve([]))
      
     
      final.then((res) => {
        console.log({res})
        callback(res)
      })
     
  
  }
  
  mapLimit([1,2,3,4,5], 2, getUserById, (allResults) => {
    console.log('output:', allResults) // ["User1", "User2", "User3", "User4", "User5"]
  })