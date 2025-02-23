/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {boolean}
 */

class BSTIterator {
    constructor(root,isSorted) {
        this.root = root
        this.isSorted = isSorted
        this.stack = []
        this.traverse(root)
    }

    traverse(node) {
        
        while(node) {
            this.stack.push(node)
            // true > [5,3,2] ,false > [5,6,7]
            node = this.isSorted ? node.left : node.right
        }
    }

    next() {
        //left >  [5,3,2] 
        // right > [5,6,7]
        let curr = this.stack.pop()
        let temp = curr
        if(this.isSorted) {
           this.traverse(curr.right)
        }
        else {
           this.traverse(curr.left)
        }
        return curr.val
    }
}
var findTarget = function(root, k) {
    if(!root) return false

    let left_node = new BSTIterator(root,true)
    let right_node=  new BSTIterator(root,false)
    let left_val = left_node.next()
    let right_val = right_node.next()

    while(left_val < right_val) {
        if(left_val + right_val === k) {
            return true
        }
        else if(left_val + right_val < k) {
            left_val = left_node.next()
        }
        else {
            right_val = right_node.next()
        }
    }
    return false
};