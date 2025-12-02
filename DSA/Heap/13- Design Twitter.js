class MaxHeap1{
    constructor() {
        this.heap = [];
    }

    heapifyUp() {
        let currentIndex = this.heap.length - 1;
        while(currentIndex > 0){
            let parentIndex = Math.floor((currentIndex-1)/2)
            if(this.heap[parentIndex][0] < this.heap[currentIndex][0]) {
                [this.heap[parentIndex],this.heap[currentIndex]] = [this.heap[currentIndex] , this.heap[parentIndex]]
                currentIndex = parentIndex
            } else {
                break
            }
        }
    }

    heap_push(val){
        this.heap.push(val);
        this.heapifyUp()
    }

    heapifyDown(){
        let currentIndex = 0
        let leftIndex = 2 * currentIndex + 1
        let rightIndex = 2 * currentIndex + 2
        while (leftIndex < this.heap.length) {
            let temp = currentIndex
            if(this.heap[temp][0] < this.heap[leftIndex][0]) {
                temp = leftIndex
            }
            if(rightIndex < this.heap.length  && this.heap[temp][0] < this.heap[rightIndex][0]) {
                temp = rightIndex
            }
            if(temp == currentIndex ){
                return
            }
            [this.heap[temp],this.heap[currentIndex]] = [this.heap[currentIndex] ,this.heap[temp]]
            currentIndex = temp
            leftIndex = 2 * currentIndex + 1
            rightIndex = 2 * currentIndex + 2
        }
    }

    heap_pop(){
        if(this.heap.length == 1) {
            return this.heap.pop()
        }
        let result = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return result;
    }

    print_heap(){
        return this.heap
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null
    }

    size() {
        return this.heap.length
    }
}

var Twitter = function() {
    this.timer = 0
    this.tweets = new Map()
    this.following = new Map()
};

/** 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    if(!this.tweets.has(userId)) {
        this.tweets.set(userId,[])
    }
    this.tweets.get(userId).push([this.timer++,tweetId])
};

/** 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
    
    let maxHeap = new MaxHeap1()

    // Add own tweets
    if(this.tweets.has(userId)) {
        for(let [time,tweetId] of this.tweets.get(userId)) {
            maxHeap.heap_push([time,tweetId])
        }
    }

    // Add tweets from the follower
    if(this.following.has(userId)) {
        // Each user can follow multiple users
        for(let followee of this.following.get(userId)) {
            // Get the followee from the tweets
            if(this.tweets.has(followee)) {
                for(let [time,tweetId] of this.tweets.get(followee)) {
                    maxHeap.heap_push([time,tweetId])
                }
            }
        }
    }

    let count = 0
    let result = []
    while(count < 10 && maxHeap.size() > 0) {
        const [_,tweetId] = maxHeap.peek()
        maxHeap.heap_pop()
        result.push(tweetId)
        count++
    }

    return result
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    /* Map {1:[2,3,4], 2:[5,6,7]}
        If you wants to delete the 3 from the followerID(1), if we use array we need to iterate through it and delete.
        So instead of array use set > takes o(1) to delete
    */
    if(!this.following.has(followerId)) {
        this.following.set(followerId,new Set())
    }
    this.following.get(followerId).add(followeeId)
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    if(this.following.has(followerId)) {
        this.following.get(followerId).delete(followeeId)
    }
};

/** 
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */