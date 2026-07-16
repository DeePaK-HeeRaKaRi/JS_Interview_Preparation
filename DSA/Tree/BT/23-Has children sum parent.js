//https://www.geeksforgeeks.org/problems/children-sum-parent/1

/*
class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
    isSumProperty(root) {
        //  code here
        function helper(root) {
            if(root == null) {
                return [0,true]
            }
            
            if(root.left == null && root.right == null) {
                return [root.data,true]
            }
            
            const [left,isLeftValid] = helper(root.left)
            const [right,isRightValid] = helper(root.right)
            const curr_sum = left+right
            if(curr_sum == root.data && isLeftValid && isRightValid) {
                return [curr_sum,true]
            }
            else {
                return [0,false]
            }
            
        }
        const [value, isValid] = helper(root)
        return isValid
    }
}