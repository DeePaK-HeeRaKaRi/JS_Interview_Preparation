
/*LINKED LIST NODE
//https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1
class Node {
  constructor(x){
    this.data = x;
    this.next = null;
    this.bottom = null;
  }
}
*/

/**
 * @param {Node} head
 * @return {Node}
 */


class Solution {
    // Tc = O(n * (2*m))  n > horizontal nodes, m = vertical nodes
    flatten(root) {
        // your code here
        if(root == null || root.next == null) return root
        let rootNext = this.flatten(root.next)
        return this.merge(root,rootNext)
    }
    
    merge(list1,list2) {
        let res = new Node(-1)
        let temp = res
        while(list1 != null && list2 != null) {
            if(list1.data < list2.data) {
                temp.bottom = list1
                temp = temp.bottom
                list1 = list1.bottom
            } else {
                 temp.bottom = list2
                 temp = temp.bottom
                 list2 = list2.bottom
            }
        }
        
        if(list1) {
            temp.bottom = list1
        } else {
            temp.bottom = list2
        }
        
        return res.bottom
    }
}