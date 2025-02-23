var BSTIterator = function(root) {
    this.stack = []
    this.curr = root
    while(this.curr) {
        this.stack.push(this.curr)
        this.curr = this.curr.left
    }
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
    let node = this.stack.pop()
    let right = node.right
    while(right) {
        this.stack.push(right)
        right = right.left
    }
    return node.val // Ascending order
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
    return this.stack.length != 0 
};