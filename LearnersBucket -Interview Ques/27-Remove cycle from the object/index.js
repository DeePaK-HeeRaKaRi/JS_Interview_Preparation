

function removeCycles(obj,set = new WeakSet()) {

    if(typeof obj !='object' || obj == null) return obj

    if(set.has(obj)) {
        return "null"
    }

    set.add(obj)

    const newObj = Array.isArray(obj) ? [] : {}

    for(let key in obj) {
        if(typeof obj[key] == 'object') {
            newObj[key] = removeCycles(obj[key],set)
        }else {
            newObj[key] = obj[key]
        }
    }
    return newObj
}

const obj = {
    name: "A",
    child: {
        name: "B",
        child: {
            name: "C",
            child: null // Placeholder, will be assigned later
        }
    }
};
console.log(obj);
// Creating cycles
obj.child.child.child = obj; // C -> A (cycle)
obj.self = obj; // A -> A (self-cycle)

const cleanedObj = removeCycles(obj);
console.log(JSON.stringify(cleanedObj, null, 2));