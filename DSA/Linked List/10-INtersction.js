var getIntersectionNode = function(headA, headB) {
    let temp1 = headA
    let temp2 = headB
    while(temp1 != temp2) {
        temp1  = temp1.next
        temp2 = temp2.next

        if(temp1 == temp2) return temp1 // you can return temp2 also
        if(temp1 == null) temp1 = headB
        if(temp2 == null) temp2 = headA

    }
    return temp1 // you can return temp2 also
};