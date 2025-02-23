const folderStructure = {
  src: {
    components: {
      Button: {
        "index.js": "file",
        "style.css": "file",
      },
    },
    utils: {
      "helpers.js": "file",
    },
  },
  public: {
    "index.html": "file",
  },
};

function findPaths(data) {

    function helper(data,parent) {
        let res = []
        for(let key in data) {
            let value  = data[key]
            let currPath = parent ? `${parent}/${key}` : key
            if (typeof value === 'object') {
                let childPath = helper(value,currPath)
                res.push(...childPath) 
            }
            else {
                res.push(currPath)
            }
        }
       
        return res
    }

    return helper(data,'')
}

console.log(findPaths(folderStructure))

/* Expected Output
   [
    "src/components/Button/index.js",
    "src/components/Button/style.css",
    "src/utils/helpers.js",
    "public/index.html"
   ]

   */
