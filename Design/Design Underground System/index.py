 
class UndergroundSystem:
     def __init__(self):
        self.checkIn  = {}
        self.checkOut = {}

     def checkIn1(self, id1, stationName, t):
        // same person should not checkIn twice
        if (id1 not in self.checkIn):
            self.checkIn[id1]=[stationName,t]
        print('self.checkIn-------',self.checkIn)
        
     def checkOut1(self, id1, stationName, t):
        if(id1 in self.checkIn):
            checkIn_StationName = self.checkIn[id1][0]
            checkIn_time = self.checkIn[id1][1]
        if(checkIn_StationName in self.checkOut):
            self.checkOut[checkIn_StationName].append([stationName,abs(checkIn_time-t)])
        else:
            self.checkOut[checkIn_StationName]=[]
            self.checkOut[checkIn_StationName].append([stationName,abs(checkIn_time-t)])
        print('checkOut----',self.checkOut)

     def getAverageTime(self, startStation, endStation):
            if(startStation in self.checkOut):
                if(len(self.checkOut[startStation]) == 1):
                    print('AVg--------',self.checkOut[startStation][0][1])
                    return self.checkOut[startStation][0][1]
                else:
                    n=len(self.checkOut[startStation])
                    avg=0
                    for i in range(n):
                        avg+=self.checkOut[startStation][i][1]
                    print(avg/n)
                    return avg/n

undergroundSystem  = UndergroundSystem()
undergroundSystem.checkIn1(45, "Leyton", 3)
undergroundSystem.checkIn1(32, "Paradise", 8)
undergroundSystem.checkIn1(27, "Leyton", 10)

undergroundSystem.checkOut1(45, "Waterloo", 15)
undergroundSystem.checkOut1(27, "Waterloo", 20)
undergroundSystem.checkOut1(32, "Cambridge", 22)

undergroundSystem.getAverageTime("Paradise", "Cambridge")
undergroundSystem.getAverageTime("Leyton", "Waterloo")

undergroundSystem.checkIn1(10, "Leyton", 24)

undergroundSystem.getAverageTime("Leyton", "Waterloo")

undergroundSystem.checkOut1(10, "Waterloo", 38)

undergroundSystem.getAverageTime("Leyton", "Waterloo")



