class Router {
    constructor() {
        this.routes = []
    }

    addRoute(path,value) {
        const tokens = path.split('/').filter(Boolean)
        this.routes.push({
            tokens,
            value
        })
    }

    callRoute(path) {
        const path_tokens = path.split('/').filter(Boolean)
        let bestScore = -1
        let bestMatch = null
        for(let route of this.routes) {
            
            let score = 0
            let matched = true
            for(let i = 0; i<route.tokens.length; i++) {
                if(route.tokens[i] == path_tokens[i]) {
                    score+=2
                }
                else if(route.tokens[i] == '*') {
                    score +=1
                }
                else {
                    matched = false
                    break
                }
            }

            if(matched && score > bestScore) {
                bestScore = score
                bestMatch = route.value
            }
        }

        return bestMatch
    }
}

const router = new Router();

router.addRoute("/bar", "result");
console.log(router.callRoute("/bar")); 
// result

router.addRoute("/foo", "foo");
router.addRoute("/bar/*/baz", "bar");

console.log(router.callRoute("/bar/a/baz")); 
// bar

router.addRoute("/foo/baz", "foo");
router.addRoute("/foo/*", "bar");

console.log(router.callRoute("/foo/baz")); 
// foo (exact match wins)

console.log(router.callRoute("/foo/xyz")); 
// bar
