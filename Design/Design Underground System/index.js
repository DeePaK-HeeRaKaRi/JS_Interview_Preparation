class UndergroundSystem {
  constructor() {
    this.checkInMap = {};
    this.checkOutMap = {};
  }
  checkIn(id1, stationName, t) {
    if(!(id1 in this.checkInMap)){
        this.checkInMap[id1] = [stationName, t];
    }
    console.log('checkInMap---------',this.checkInMap)
  }

  checkOut(id1, stationName, t) {
    if(id1 in this.checkInMap){
        const [checkIn_StationName, checkIn_time] = this.checkInMap[id1]
        delete this.checkInMap[id1]

        if(checkIn_StationName in this.checkOutMap){
            this.checkOutMap[checkIn_StationName].push([stationName, Math.abs(checkIn_time-t)])
        }
        else{
            this.checkOutMap[checkIn_StationName]=[[stationName, Math.abs(checkIn_time-t)]]
        }
    }
    console.log('checkOutMap--------',this.checkOutMap)
  }

  getAverageTime(startStation, endStation){
    if(startStation in this.checkOutMap){
        let avg = 0
        let c =0
        console.log('------------',this.checkOutMap[startStation])
        for (let i of this.checkOutMap[startStation]) {
            console.log("-----i",i);
            const [cur_stat, cur_time] = i;
            if(endStation === cur_stat) {
                avg += cur_time
                c+=1
            }
        }
        console.log('avg-------',avg/c)
    }
  }
}
const undergroundSystem = new UndergroundSystem();
undergroundSystem.checkIn(37043, "K2618O72", 29);
undergroundSystem.checkOut(37043, "U1DTINDT", 39);
undergroundSystem.getAverageTime("K2618O72", "U1DTINDT");
undergroundSystem.checkIn(779975, "K2618O72", 112);
undergroundSystem.checkOut(779975, "CN3K6CYM", 157);
undergroundSystem.getAverageTime("K2618O72", "U1DTINDT");
undergroundSystem.checkIn(706901, "K2618O72", 221);
undergroundSystem.getAverageTime("K2618O72", "CN3K6CYM");
undergroundSystem.checkIn(18036, "K2618O72", 258);
undergroundSystem.getAverageTime("K2618O72", "U1DTINDT");
undergroundSystem.getAverageTime("K2618O72", "CN3K6CYM");
undergroundSystem.checkOut(18036, "U1DTINDT", 293);
