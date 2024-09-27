function classNames(...args) {
    // console.log(args)
    function  flatten(arr) {
        let result = ''
        for(let element of arr){
            if(element && (typeof element == 'string' || typeof element == 'number')){
                result += element + ' ';
            }else if(typeof element === 'object') {
                console.log('-----------')
                if(Array.isArray(element)) {
                    result+=flatten(element) + ' '
                }else{
                    for(const key in element) {
                        if(element.hasOwnProperty(key) && element[key] ) {
                            result +=key +' '
                        }
                    }
                }
            }
        }
        return result
    }

     
    let output = flatten(args)
    console.log('output----',output)
    return output.trimEnd()
    
}

const obj = new Map()
obj.cool = '!'

// classNames({BFE: [], dev: true, is: 3},obj) 
// 'BFE dev is cool'

classNames(['BFE', [{dev: true}, ['is', [obj]]]])

// 'BFE dev is cool'
// classNames(null, undefined, Symbol(), 1n, true, false)