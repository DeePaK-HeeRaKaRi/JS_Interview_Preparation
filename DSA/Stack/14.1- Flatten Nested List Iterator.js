var NestedIterator = function(nestedList) {
    
    function flatten(arr){
        var result = []
        if(Array.isArray(arr)) {
            for(let i of arr) {
                if(Array.isArray(i)) {
                    result = [...result,...flatten(i)]
                }
                else{
                    result.push(i)
                }
            }
        }
        else{
            result.push(arr)
        }
        console.log(result)
        return result
    }

    this.list = flatten(nestedList)
    console.log('list',this.list)
    this.index = 0
    this.currentElement = null
};


/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
   return this.index < this.list.length
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
    this.currentElement = this.list[this.index]
    this.index++
    return this.currentElement
};

let nestedList = [[1,1],2,[1,1]]
// nestedList = [1,[4,[6]]]
let iterator = new NestedIterator(nestedList)
// iterator.hasNext()
let res = []
while (iterator.hasNext()){
    res.push(iterator.next())
}

console.log(res)