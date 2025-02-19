var MinStack = function() {
    this.stack = []
    this.prevmin = Infinity
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    if(this.stack.length > 0) {
        if(val < this.prevmin ) {
            let modified_val  = 2*val - this.prevmin
            this.stack.push(modified_val)
            // this.prevmin = Math.min(val,this.prevmin)
        }
        else {
            this.stack.push(val) 
        }
        this.prevmin = Math.min(val,this.prevmin)
    }
    else {
        this.stack.push(val)
        this.prevmin =val
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    // while poping , need to update the prevmin as well
    if(this.stack.length == 0) return

    let top = this.stack[this.stack.length - 1]
    this.stack.pop()
    if(top < this.prevmin) {
        this.prevmin = 2*this.prevmin - top  // give the what is the next prev min
    }

};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    if(this.stack.length == 0) return -1

    let top = this.stack[this.stack.length - 1]

    if(top < this.prevmin) {
        return this.prevmin
    }

    return top
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.prevmin
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */