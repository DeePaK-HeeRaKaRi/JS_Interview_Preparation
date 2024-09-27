function candy(ratings) {
    let n = ratings.length;
    // Children with a higher rating get more candies than their neighbors.
    // So find the left and right
    let left = new Array(n).fill(1)  //Each child should has atleast one candy
    for(let i=1;i<n; i++) {
        if(ratings[i] > ratings[i-1]) {  //Check for the Left
            left[i] = left[i-1] + 1
        }
    }

    // let right = new Array(n).fill(1) //Check for right
    // for(i=n-2;i>=0;i--) {
    //     // console.log(i)
    //     if(ratings[i] > ratings[i+1]) {
    //         right[i] = right[i+1] + 1  //+1 > higher rating get more candies
    //     }
    // }
    // let sum = 0
    // for(i=0;i<n;i++) {
    //     sum+=Math.max(left[i],right[i])
    // }
    
    let currRating = 1
    let sum = Math.max(currRating,left[n-1])
    for(i=n-2;i>=0;i--) {
        if(ratings[i] > ratings[i+1]) {
            currRating +=1
        }
        else{
            currRating = 1
        }
        sum += Math.max(left[i],currRating)
    }
    return sum
}

let ratings = [1,3,2,1]
console.log(candy(ratings))