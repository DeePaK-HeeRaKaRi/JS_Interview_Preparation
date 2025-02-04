var isValidBST = function(root) {
   
    function checkBST(root,leftmin,rightmax) {
         if(root == null) return true
         // leftmiin <= root && root<=rightmax
         if(leftmin >= root.val || root.val >= rightmax) return false
         let left = checkBST(root.left,leftmin,root.val)
         let right = checkBST(root.right,root.val,rightmax)
         return left && right
    }
 
    return checkBST(root,-Infinity,Infinity)
 };