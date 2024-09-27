class myJSON {
  static myParse(string) {
    //  remove the spaces from string
    string = string.replace(/ /g, "");

    // convert each value accordingly
    switch (string) {
      case "":
        throw new Error("Unexpected end of JSON input");
      case "null":
        return null;
      case "{}":
        return {};
      case "[]":
        return [];
      case "true":
        return true;
      case "false":
        return false;
      default:
        if (+string === +string) {
          return Number(string);
        }
        // ''' or '"'
        else if (string[0] === "'") {
          throw new Error("Invalid or unexpected token");
        } else if (string[0] === '"') {
          console.log("--------------", string.substring(1, string.length - 1));
          return string.substring(1, string.length - 1);
        } else {
          // [] or {} =. "[0,1,2,3]" =>
          // t="[0,1,2]" =>  t.substring(1,t.length-1) => 0,1,2
          // removing braces
          // '{"deep":"heerakari","a":989}'
          const innerString = string.substring(1, string.length - 1);
          console.log("innerString----", innerString);
          // or
          // const innerString = string.slice(1,-1)

          // get the values from the string
          const subStrings = this.stringSplitByComma(innerString);
          console.log("subStrings---", subStrings);
          if (string[0] === "[") {
            return subStrings.map((item) => this.myParse(item));
          }
          // "{a:1,b:2}" => a:1,b:2
          else if (string[0] === "{") {
            return subStrings.reduce((acc, item) => {
              console.log("item-------", item);
              if (item.indexOf(":") > -1) {
                const index = item.indexOf(":");
                const thisKey = item.substring(0, index);
                const thisValue = item.substring(index + 1);
                console.log("thisKey, thisValue", thisKey, thisValue);
                acc[this.myParse(thisKey)] = this.myParse(thisValue);
                console.log("acc----", acc);
              }
              return acc;
            }, {});
          }
        }
    }
  }
  static stringSplitByComma(str) {
    let lPar = 0;
    let l = 0;
    let r = 0;
    let lcur = 0;
    let allStrs = [];
    while (r <= str.length) {
      const rChar = str[r];
      // console.log(l, r, rChar);
      if (rChar === "[") {
        lPar++;
      }
      if (rChar === "]") {
        lPar--;
      }
      if (rChar === "{") {
        lcur++;
      }
      if (rChar === "}") {
        lcur--;
      }

      if ((rChar === "," && lPar === 0 && lcur === 0) || r === str.length) {
        const truncStr = str.substring(l, r);
        allStrs.push(truncStr);
        l = r + 1;
      }
      r += 1;
    }
    return allStrs;
  }
}

var p = '[1,2,3,"deepak",[4,5],7,9]';
// console.log(JSON.parse(p))
// p = '[3,"false",false,null]';
// p='deepak'
// var p='"deepak heerakari"'
// p = '[1,2,3,"deepak"]';
// p='{"deep":"heerakari","a":989,"c":{"d":89,"e":50,"F":{"g":90,"h":100}}}'
p='{"deep":"heer","a":{"c":90,"d":98}}'
console.log(myJSON.myParse(p))
// var t = JSON.parse('"deepak heeerakari"');
// console.log(t,typeof t);