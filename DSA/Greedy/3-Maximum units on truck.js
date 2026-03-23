
var maximumUnits = function(boxTypes, truckSize) {
    let items = boxTypes.sort((a,b) => b[1] - a[1])

    let max_boxes = 0
    for(let [boxes,units] of items) {
        let take = Math.min(boxes, truckSize)
        max_boxes += take*units
        truckSize -= take

        if(truckSize == 0 ) break
    }

    return max_boxes
};

