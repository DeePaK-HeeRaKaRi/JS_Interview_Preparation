function lemonadeChange(bills) {
    let hm = {5:0,10:0}
    for(let i = 0; i < bills.length; i++){
        // console.log(hm)
        if(bills[i] == 5){
            hm[5] += 1
        }
        else if(bills[i] == 10) {
            hm[10]+=1
            if(hm[5] >= 1) {
                hm[5] -= 1
                
            }
            else{
                return false
            }
        }
        else if(bills[i] == 20){
           
            if(hm[10] >=1 && hm[5] >= 1) {
                hm[10]-=1
                hm[5]-=1
            }
            else if(hm[5] >=3 ){
                hm[5]-=3
            }
            else{
                return false
            }
        }
    }
    return true
}

let bills = [5,5,5,10,20]
console.log(lemonadeChange(bills))