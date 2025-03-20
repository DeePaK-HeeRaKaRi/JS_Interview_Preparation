function flattenByLength(arr) {
    let result = [];
  
    function process(arr) {
      let subArrays = [];
  
      for (let item of arr) {
        if (Array.isArray(item)) {
          subArrays.push(item);
        } else {
            result.push(item);
        }
      }

      if(subArrays.length){
        // Sort sub-arrays by length
        subArrays.sort((a, b) => a.length - b.length);
    
        // Recursively process sorted sub-arrays
        for (let sub of subArrays) {
            process(sub);
        }
      }
      
    }
  
    process(arr);
    return result;
  }
  
  let arr = [
    1,
    2,
    [3, [4, 10, [90, 100], [900, 999]], 5],
    [100, 200, 300],
    [1000,2000],
    6,
    [7],
    [10],
  ];
  
  console.log(flattenByLength(arr));
  