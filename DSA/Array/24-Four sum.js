function foursum(arr,target) {
    
    arr.sort((a,b) => a-b)
    // let ans = new Set()
    let ans = []
    for(let i=0;i<arr.length-1;i++) {
        if(i>0 && arr[i] == arr[i-1]) continue;
        for(let j=i+1;j<arr.length-1;j++) {
            if(j > i+1 && arr[j] == arr[j-1]) continue
            let start = j+1
            let end = arr.length - 1

            while(start < end) {
                let sum = arr[i] + arr[j] + arr[start] + arr[end]

                if(sum == target) {
                    ans.push([arr[i],arr[j],arr[start],arr[end]])
                    // ans.add(JSON.stringify([arr[i],arr[j],arr[start],arr[end]]))
                    while(start < end && arr[start] == arr[start+1]) {
                        start++
                    }
                    while(start < end && arr[end] == arr[end-1]) {
                        end--
                    }
                    start++
                    end--
                }
                else if(sum < target) {
                    start++
                }
                else{
                    end--
                }
            }
        }
    }
    // return Array.from(ans).map(i => JSON.parse(i))
    return ans
}

let nums = [1,0,-1,0,-2,2]
let target = 0
nums = [2,2,2,2,2], target = 8
console.log(foursum(nums,target))
