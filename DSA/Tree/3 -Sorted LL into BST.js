var sortedListToBST = function(head) {
    function middle(head) {  // o(n/2)
       // use slow and fast pointers for middle & reverse slow.next 
       // [1,2,3,4,5] > 3 , fast will be at last index
       // [1,2,3,4,5,6] > 3 , fast will be at null 
   
       let slow = head, prev = null;
       let fast = head;
       
       while (fast !== null && fast.next !== null) {
           prev = slow;       // Track node before slow
           slow = slow.next;
           fast = fast.next.next;
       }

       // Disconnect left half from the middle
       if (prev !== null) {
           prev.next = null;
       }

       return slow;
   }

   function helper(head) {
      if (head === null) return null;  

       let mid = middle(head);  // Find middle node
       let root = new TreeNode(mid.val); // Convert ListNode to TreeNode

       // Base case: if the mid is the only node left, return it
       if (mid === head) return root;

       root.left = helper(head);    // Left part of the list
       root.right = helper(mid.next); // Right part of the list

       return root;
   }

   return helper(head)
};