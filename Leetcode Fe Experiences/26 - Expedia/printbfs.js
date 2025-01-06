class PrintPackages {
    constructor() {
        this.packages = new Map()
    }

    add(package1) {
        const pacakge_list = package1.split('.') // [java,util,vector] , [java,util,regex,pattern]
        this.add_helper(this.packages,pacakge_list)
    }

    add_helper(currMap,currPackages) {
        if(currPackages.length == 0) {
            return
        }

        const key = currPackages.shift();
        if(!currMap.has(key)) {
            currMap.set(key, new Map())
        }

        this.add_helper(currMap.get(key),currPackages)
    }
    
    print() {

        const mapToObject= (map) => {
            const obj = {}
            for(let [key,value] of map.entries()) {
                obj[key] = value instanceof Map ? mapToObject(value) : value
            }
            return obj
        }

        return mapToObject(this.packages)
    }

    print_hierarchical_structure() {
        // le
        const mapToObject =(map,depth) => {
            let result = ''
            for(let [key,value] of map.entries()) {
                result += `${'\t'.repeat(depth)}-${key}\n`
                if(value instanceof Map) {
                    result += mapToObject(value,depth+1)
                }
            }
            return result
        }
        return mapToObject(this.packages, 0)
    }
}

const packages = new PrintPackages()

packages.add('java.util.vector')
packages.add('java.util.Date')
packages.add('org.json.JSONObject')
packages.add('java.util.regex.Pattern')
packages.add('org.writequit.Strings')


// console.log(packages.print())
console.log(packages.print_hierarchical_structure())
