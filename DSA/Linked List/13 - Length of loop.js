
var findLength =(slow,fast) => {
    let cnt = 1
    slow = slow.next
    while(slow !== fast) {
        cnt++
        slow = slow.next
    }
    return cnt
}

var hasCycle = function(head) {
    // BF - Using Map. tc -o(n) sc o(n)
    let slow = head
    let fast = head
    while(fast!=null && fast.next!=null) {
        // Every time it will reduce the distance by 1 >  4-S, 7-f d= 5 >  5-S, 9-f, d= 3 ...
        slow = slow.next
        fast = fast.next.next
        if(slow == fast) {
            return findLength(slow,fast)
        }
    }
    return 0
};