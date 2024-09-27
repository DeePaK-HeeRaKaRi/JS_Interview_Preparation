class MapPolyfill {
    constructor() {
        this.keys = []
        this.values = []
    }

    set(key,value) {

    }

    get(key) {

    }
}

let map = new Map() 

// map.set('name',["Alice"])
map.set('name',['Alice'])
console.log(map)
if(map.has('name')) {
    map.set('name',[...map.get('name'),'deepak'])
}
else{
    map.set('name',['Alice'])
}

console.log(map)


let t = ["deep","kuma","lkrj",'jaya','dps']
console.log(t.indexOf('jaya'))