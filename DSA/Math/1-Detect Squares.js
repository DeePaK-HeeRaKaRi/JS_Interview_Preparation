var DetectSquares = function() {
    this.hashMap = new Map()
};

/** 
 * @param {number[]} point
 * @return {void}
 */
DetectSquares.prototype.add = function(point) {
    const key = `${point[0]},${point[1]}`
    this.hashMap.set(key, (this.hashMap.get(key) || 0) + 1)
};

/** 
 * @param {number[]} point
 * @return {number}
 */
DetectSquares.prototype.count = function(point) {
    let count = 0
    const [x,y] = point
    for(let [key,freq] of this.hashMap.entries()) {
        const [px,py] = key.split(',').map(Number)
        // Checking for height and width should be same
        if((x!=px && y!=py) && Math.abs(x-px) == Math.abs(y-py)) {
            // check for two diagonals
            const dia_point1 = `${px},${y}`
            const dia_point2 = `${x},${py}`
            if(this.hashMap.has(dia_point1) && this.hashMap.has(dia_point2)) {
                count += this.hashMap.get(dia_point1) * this.hashMap.get(dia_point2) * freq
            }
            console.log({count})
        }
    }
    return count
};

var obj = new DetectSquares()
obj.add([3,10])
obj.add([11,2])
obj.add([3,2])
console.log(obj.count([11,10]))
console.log(obj.count([14,8]))
obj.add([11,2])
console.log(obj.count([11,10]))
