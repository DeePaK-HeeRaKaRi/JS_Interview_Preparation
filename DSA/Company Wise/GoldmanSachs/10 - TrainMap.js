// https://leetcode.com/discuss/post/1639541/goldman-sachs-coderpad-iplist-train-map-vp9jv/

class RailNetwork {
    constructor(){
        this.graph = new Map()

    }
    addStation(name) {
        if(!this.graph.has(name)) {
            this.graph.set(name, new Set())
        }
    }

    connectStations(s1,s2){
        this.addStation(s1)
        this.addStation(s2)
        this.graph.get(s1).add(s2)
        this.graph.get(s2).add(s1)
    }

    shortestPath(fromStation,toStation) {
        if(!this.graph.has(fromStation) || !this.graph.has(toStation)) return []

        let visited = new Set()
        let parent = new Map()
        let queue = [[fromStation, 1]]
        visited.add(fromStation)
        
        let index = 0
        while(index < queue.length) {
            const [currStation,count] = queue[index++]

            if(currStation == toStation) {
                console.log({count})
                let path = []
                let node = toStation
                while(node) {
                    path.push(node)
                    node = parent.get(node)
                }
                return path.reverse()
            }

            for(let neighbour of this.graph.get(currStation)) {
                if(!visited.has(neighbour)) {
                    visited.add(neighbour)
                    queue.push([neighbour, count+1])
                    parent.set(neighbour, currStation) // From where it is came from
                }
            }
        }

        return []
    }
}
const network = new RailNetwork();
network.connectStations('A', 'B');
network.connectStations('B', 'C');
network.connectStations('C', 'D');
network.connectStations('A', 'E');

console.log(network.shortestPath('A', 'D')); // ['A', 'B', 'C', 'D']
console.log(network.shortestPath('E', 'C')); // ['E', 'A', 'B', 'C']
console.log(network.shortestPath('A', 'A')); // ['A']
console.log(network.shortestPath('A', 'Z')); // []