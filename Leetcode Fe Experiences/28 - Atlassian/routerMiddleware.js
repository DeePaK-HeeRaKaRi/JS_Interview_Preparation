// class Router {
//     constructor() {
//         this.routes = []
//     }

//     addRoute(path,value) {
//         const tokens = path.split('/').filter(Boolean)
//         this.routes.push({
//             tokens,
//             value
//         })
//     }

//     callRoute(path) {
//         const path_tokens = path.split('/').filter(Boolean)
//         let bestScore = -1
//         let bestMatch = null
//         for(let route of this.routes) {
            
//             let score = 0
//             let matched = true
//             for(let i = 0; i<route.tokens.length; i++) {
//                 if(route.tokens[i] == path_tokens[i]) {
//                     score+=2
//                 }
//                 else if(route.tokens[i] == '*') {
//                     score +=1
//                 }
//                 else {
//                     matched = false
//                     break
//                 }
//             }

//             if(matched && score > bestScore) {
//                 bestScore = score
//                 bestMatch = route.value
//             }
//         }

//         return bestMatch
//     }
// }

// const router = new Router();

// router.addRoute("/bar", "result");
// console.log(router.callRoute("/bar")); 
// // result

// router.addRoute("/foo", "foo");
// router.addRoute("/bar/*/baz", "bar");

// console.log(router.callRoute("/bar/a/baz")); 
// // bar

// router.addRoute("/foo/baz", "foo");
// router.addRoute("/foo/*", "bar");

// console.log(router.callRoute("/foo/baz")); 
// // foo (exact match wins)

// console.log(router.callRoute("/foo/xyz")); 
// // bar
/*You are scanning every route for every request. That becomes expensive if routes grow large (think 10k+ routes).*/


/*   NEED TO REVISIST AGAIN */
class TrieNode {
    constructor() {
        this.children = new Map(); // exact matches
        this.wildcard = null;      // '*' child
        this.value = null;         // route value if this is end
    }
}

class Router {
    constructor() {
        this.root = new TrieNode();
    }

    addRoute(path, value) {
        const tokens = path.split('/').filter(Boolean);
        let node = this.root;

        for (let token of tokens) {
            if (token === '*') {
                if (!node.wildcard) {
                    node.wildcard = new TrieNode();
                }
                node = node.wildcard;
            } else {
                if (!node.children.has(token)) {
                    node.children.set(token, new TrieNode());
                }
                node = node.children.get(token);
            }
        }

        node.value = value;
    }

    callRoute(path) {
        const tokens = path.split('/').filter(Boolean);

        const dfs = (node, index) => {
            if (!node) return null;
            if (index === tokens.length) return node.value;

            const token = tokens[index];

            // Prefer exact match first
            const exact = dfs(node.children.get(token), index + 1);
            if (exact !== null) return exact;

            // Then wildcard
            return dfs(node.wildcard, index + 1);
        };

        return dfs(this.root, 0);
    }
}
