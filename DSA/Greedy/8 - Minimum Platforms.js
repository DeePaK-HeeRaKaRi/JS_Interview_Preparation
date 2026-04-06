function MimimumPlatforms(arrival,departure) {
    let n = arrival.length;
    arrival.sort((a,b) => a-b)
    departure.sort((a,b) => a-b)
    let i= 0
    let j = 0
    let platforms = 0
    let result = 0
    while(i<n && j<n) {
        if(arrival[i] > departure[j]) {
            platforms--
            j++
        }
        else{
            platforms++;
            i++
        }
        console.log({i,j,ar:arrival[i],dep:departure[j]})
        result = Math.max(platforms,result)
    }
    return result
}
let arrival = [9,940,950,1100,1500,1800]
let departure = [910,1200,1120,1130,1900,2000]
console.log(MimimumPlatforms(arrival,departure)) 
