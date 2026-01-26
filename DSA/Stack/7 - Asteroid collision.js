 
 var asteroidCollision = function(arr) {
    // [4,7,1,1,2,-3,-7,17,15,-16]
    let stack = []
    for(let i=0;i<arr.length; i++) {
        if(arr[i] > 0) {
            stack.push(arr[i])
        }
        else {
            // stacks last element is < abs(arr[i]) [4,7,1,1,2] -3 > [4,7] , 1,1,2 will collide & it should move towards left
            while(stack.length && stack[stack.length-1] >0 && stack[stack.length-1] < Math.abs(arr[i])) {
                stack.pop()
            }
            // If moving in the same direction  both will collide and dont push to stack
            if(stack.length>0 &&  stack[stack.length-1] == Math.abs(arr[i])){ //
                stack.pop()
            }
            // If st== 0 || last element is moving towards left (-ve ) push to stack
            else if((stack.length > 0 && stack[stack.length-1] <0) || stack.length==0) {
                stack.push(arr[i])
            }
        }
    }
    return stack
};