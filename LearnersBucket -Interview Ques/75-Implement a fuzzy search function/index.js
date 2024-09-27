const fuzzySearch=(str,query)=>{
    console.log('----------',str)
    let strSize = str.length
    let querySize = query.length
    if(querySize > strSize){
        return false
    }
    str=str.toLowerCase()
    query=query.toLowerCase()
    let l=0
    while(l <= strSize-querySize){
        let subStr = str.substring(l,l+querySize)
        if(subStr === query){
            return true
        }
        l++
    }
    return false
}
const search = (arr, query) => {
  return arr.filter((val) => fuzzySearch(val,query));
};
const arr = [
  "Doomsayer",
  "Doomguard",
  "Doomhamer",
  "Bane of Doom",
  "Fearsome Doomguard",
  "Dr. Boom",
  "Majordomo",
  "Shadowbomber",
  "Shadowform",
  "Goldshire footman",
];
// fuzzySearch("Goldshire footman", 'shi');
console.log(search(arr, "sh"));
