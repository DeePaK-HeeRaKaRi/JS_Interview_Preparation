var mergeTwoLists = function(list1, list2) {
    let dumyNode = new ListNode(-1)
    let temp = dumyNode

    while(list1 != null && list2 != null) {
        if(list1.val < list2.val) {
            temp.next = list1
            list1 = list1.next
        }
        else{
            temp.next = list2
            list2 = list2.next
        }
        temp = temp.next
    }

    if(list1 == null) {
        temp.next = list2
    }
    else {
        temp.next = list1
    }

    return dumyNode.next
};