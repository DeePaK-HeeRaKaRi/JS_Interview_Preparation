var detectCycle = function(head) {
    // d = from head to start of Loop
    // L = Length of loop
    // x = Distance from the start of the loop to the meeting point inside the loop.
    // slow = d+x fast = d+x+L; fast > 2*(d+x) = d+x+l > d+x = L > d=L-x to travel
    function findStartingLoop(slow,fast) {
        while(slow != fast) {
            slow = slow.next
            fast = fast.next
        }
        return slow
    }
    if(head == null || head.next == null) return null
    let slow = head
    let fast = head
    while(fast!=null && fast.next!=null) {
        slow = slow.next
        fast = fast.next.next
        if(slow == fast) {
            slow = head
            return findStartingLoop(slow,fast)
        }
    }
    return null
};