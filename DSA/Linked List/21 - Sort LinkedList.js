// BF > Take Array > push all menents > apply sort > change heads | 
// TC o(n)+o(nlogn) + o(n) >> sc (o(n))




class Node{
    constructor(val) {
        this.val = val
        this.next = null
    }
}



function getHead(arr) {
    let head = null
    let tail = null
    for(let i of arr) {
        let new_node = new Node(i)
        if(head == null) {
            head = new_node
            tail = new_node
        }
        else {
            tail.next = new_node
            tail = new_node
        } 
    }
    return head
}

function printInput(head) {
    console.log('--head')
 
    while(head != null) {
 
        console.log(head.val + '>' +'\t')
        head = head.next
    }
 
}




function sortLinkedList(head) {
    var mergeTwoLists = function(list1, list2) {
    
        let dumyNode = new Node(-1)
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

    function middle(head) {  // o(n/2)
        // use slow and fast pointers for middle & reverse slow.next 
        // [1,2,3,4,5] > 3 , fast will be at last index
        // [1,2,3,4,5,6] > 3 , fast will be at null 
    
        let slow = head
        let fast = head.next // To stop middle at the first place
        while(fast!=null && fast.next!=null) { // Handles for odd and even length
            slow = slow.next
            fast = fast.next.next
        }
        return slow
    }
    
    function mergeSort(head) {
        if (head == null || head.next == null) return head

        let mid = middle(head)
        let high = mid.next
        mid.next = null;
        let low = head
        let lowHead = mergeSort(low)
        let highHead = mergeSort(high)
        let mergeHead = mergeTwoLists(lowHead,highHead)
        return mergeHead
    }

    return mergeSort(head) //o(logn * (n + n/2))

     // Tc o(logn * (n + n/2)) , sc - o(1)
}
let arr = [1,2,3,3,2,1]
// arr = [1,2,3,4,5,6]
let input = getHead(arr)
// console.log({input})
let res=  sortLinkedList(input) 
let output = printInput(res)
 