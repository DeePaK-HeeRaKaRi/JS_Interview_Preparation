function parseString(str) {
    let arr =[]
    let hasDoubleQuotes = false
    let curr= ''
    for(let i=0;i<str.length;i++) {
       if(str[i] == '"') {  // change true to false
            hasDoubleQuotes = !hasDoubleQuotes
       }
       else if(str[i] == '.' && !hasDoubleQuotes) {  // If you see . & no double quotes present than the prev str should be pushed into arr 
            if(curr == '') throw new TypeError('Cannot be empty')
            arr.push(curr)
            curr =''
       }
       else {  //Store in curr
        curr += str[i]
       }
    }
    if(curr != '') arr.push(curr)
    return arr
}
function stringToObject(input, finalValue) {
        // write your code below
        if(typeof input !== 'string' || input.trim() == '') {
            throw new TypeError('Cannot be empty22')
        }
        let parseInput = parseString(input)

        function helper_dfs(arr) {
            const [curr, ...rest] = arr
            if(!curr) throw new TypeError('Cannot be empty')
            let obj = !isNaN(Number(curr)) ? [] : {}
            if(rest.length > 0) {
                obj[curr] = helper_dfs(rest)
            }
            else {
                obj[curr] = finalValue
            }

            return obj
        }
        function helper_bfs(arr) {
            let obj = {}
            let result = obj
            console.log(arr)
            for(let i=0;i<arr.length;i++) {
                // console.log({obj},arr[i])
                let curr = arr[i]
                console.log({curr})
                if(curr == '') throw new TypeError('Cannot be empty')
                let isLast = i == arr.length-1

                if(isLast) {
                    obj[curr] = finalValue
                }
                else {
                    obj[curr] = !isNaN(Number(arr[i+1])) ? [] : {}
                    obj = obj[curr]
                }
            }
            return result
        }
        // return helper_dfs(parseInput)
        return helper_bfs(parseInput) 
 }

console.log(stringToObject('a.b.c', 1));
// { a: { b: { c: 1 } } }

// console.log(stringToObject('', 1));
// throw a TypeError

// console.log(stringToObject('a."b.c"."d.e"', 2));
// consider "b.c" and "d.e" as individual keys
// output => { a: { 'b.c': { 'd.e': 2 } } }

console.log(stringToObject('users.0.name', 'devtools tech'))
// users would be an array that contains one single object with name property with final value
// { users: [{ name: 'devtools tech' }] }
