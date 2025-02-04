class myJSON {
    static value(val) {
        switch (typeof val) {
            case 'string':
                return `"${val}"`;
            case 'number':
                return isFinite(val) ? `${val}` : "null";
            case 'boolean':
                return `${val}`;
            case 'function':
            case 'undefined':
            case 'symbol':
                return 'undefined';
            case 'bigint':
                throw new TypeError("BigInt is not supported");
            case 'object':
                if (val === null) return "null";
                if (val instanceof Date) return `"${val.toISOString()}"`;
                if (val instanceof String || val instanceof Boolean) return `"${val}"`;
                if (val instanceof Number) return isFinite(val) ? `${val}` : "null";
                if (Array.isArray(val)) return `[${val.map((v) => this.value(v)).join(",")}]`;
                return this.myStringify(val);
        }
    }

    static myStringify(obj) {
        if (typeof obj !== "object" || obj === null) return this.value(obj);
        obj = this.removeCycle(obj);
        //{a:10,b:() => {},c:'deepak'}
        const objString = Object.keys(obj)
            .filter((key) => typeof obj[key] !== "function" && obj[key] !== undefined)
            .map((key) => `"${key}":${this.value(obj[key])}`)
            .join(",");

        return `{${objString}}`;
    }

    static removeCycle(obj) {
        let visited = new WeakMap();
        const iterate = (obj) => {
            for (let key in obj) {
                if (obj.hasOwnProperty(key) && typeof obj[key] === 'object' && obj[key] !== null) {
                    if (visited.has(obj[key])) {
                        obj[key] = "[Circular]";
                    } else {
                        visited.set(obj[key], true);
                        iterate(obj[key]);
                    }
                }
            }
        };
        iterate(obj);
        return obj;
    }
}
let obj={
    a:"deep",
    b: {
        c:'kumar',
        d:'heera',
        e:{
            f:"xyz",
            g:"hyi"
        }
    },
    // b1:[0,1,1],
    // c1:{c2:[{k:'key'},{v:'value'}]}
}

console.log(myJSON.myStringify(obj))
/*
Some edge cases

undefined properties should be ignored, not converted to "undefined"
================================================

JSON.stringify({ x: () => {}, y: 10 }) → '{"y":10}'
myJSON.myStringify({ x: () => {}, y: 10 }) → '{"x":"undefined","y":10}' (Incorrect)

================================================
 Functions should be ignored inside objects

JSON.stringify({ x: undefined, y: 10 }) → '{"y":10}'
myJSON.myStringify({ x: undefined, y: 10 }) → '{"x":"undefined","y":10}' (Incorrect)

================================================

if (obj === null) return "null";


*/