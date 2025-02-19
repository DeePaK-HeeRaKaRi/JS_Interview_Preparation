var removeKdigits = function(num, k) {
    let n = num.length
    let stack = []
    for(let i=0; i< n;i++) {
        while(stack.length > 0 && k>0 && Number(num[i]) < stack[stack.length-1]) {
            k-=1
            stack.pop()
        }

        stack.push(Number(num[i]))
    }
   
    while(k > 0) {  // stack = [1,2,3,4,5,6] k=3 so remove last k eleents
        stack.pop()
        k--
    }

    // Remove leading zeros
    let i = 0
    while(i<stack.length && stack[i] == 0) {
        // stack.shift()
        i++
    }
     
    stack = stack.slice(i).join('')
    // return `${stack.join('')}`.replace(/^0+/,'') || '0'
    return stack || '0'
};