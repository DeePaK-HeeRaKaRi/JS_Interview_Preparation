// function removeCycle(head){
//     let visited = new Set()
//     let prev = null
//     while(head){
//         if(visited.has(head)){
//             prev.next=null
//             return
//         }
//         visited.add(head)
//         prev = head
//         head = head.next
//     }
// }

function removeCycle(head) {
    if (!head || !head.next) {
        return;
    }

    let slow = head;
    let fast = head;

    // Detect cycle using Floyd's Tortoise and Hare algorithm
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            break;
        }
    }

    // If no cycle is detected, return
    if (!fast || !fast.next) {
        return;
    }

    // Reset slow to head and move both pointers at the same pace to find the start of the cycle
    slow = head;
    if (slow === fast) {
        // Special case: cycle starts at the head
        while (fast.next !== slow) {
            fast = fast.next;
        }
    } else {
        // General case
        while (slow.next !== fast.next) {
            slow = slow.next;
            fast = fast.next;
        }
    }

    // Remove the cycle
    fast.next = null;
}

const List=function(val){
    this.val=val
    this.next=null
}
const item1=new List(10)
const item2=new List(20)
const item3=new List(30)
const item4=new List(40)
const item5=new List(50)

item1.next=item2
item2.next=item3
item3.next=item4
item4.next=item5
item5.next=item1

let temp = item1
removeCycle(item1)
console.log(JSON.stringify(item1))