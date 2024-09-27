class myJSON {
  static myParse(string) {
    string = string.replace(/ /g, "");
    switch (string) {
      case "":
        throw new Error("Unexpected end of JSON input");
      case "null":
        return null;
      case "true":
        return true;
      case "false":
        return false;
      case "{}":
        return {};
      case "[]":
        return [];
      default:
        if (+string === +string) {
          return Number(string);
        } else if (string[0] === "\'") {
          throw new Error("Unexpected end of JSON input");
        } else if (string[0] === "\"") {
          // from 1st index to last 2nd index
          return string.substring(1, string.length - 1);
        } else {
          const innerString = string.slice(1, -1);

          const substrings = this.splitByComma(innerString);

          if (string[0] === '[') {
            return substrings.map(resp => this.myParse(resp));
          } 
          else if (string[0] === '{') {
            console.log(substrings);
            return substrings.reduce((prev, curr) => {
              if (curr.indexOf(':') > -1) {
                const index = curr.indexOf(':');
                const thisKey = curr.substring(0, index);
                const thisValue = curr.substring(index + 1);
                prev[this.myParse(thisKey)] = this.myParse(thisValue);
              }
              return prev;
            }, {});
          }
        }
    }
  }

  static splitByComma(string){
    // "a:1,b:2,c:{d:4}"
    console.log("string", string);
    let l=0
    let r=0
    let curly = 0
    let sqr = 0
    let allStrs=[]
    while(r<=string.length){
        const curString = string[r]

        if(curString === '['){
            sqr++
        }
        if(curString === ']'){
            sqr--
        }
        if(curString === '{'){
            curly++
        }
        if(curString === '}'){
            curly--
        }
        // "a:1,b"  => l=0 r=3
        if((curString === "," && sqr===0 && curly ===0) || r==string.length){
            const sub=string.substring(l,r)
            allStrs.push(sub)
            l=r+1
        }
        r++
    }
    return allStrs
  }
}

var p='{"a":1,"b":2}'
// p='[1,2,3,4,[5,6]]'
console.log(myJSON.myParse(p))