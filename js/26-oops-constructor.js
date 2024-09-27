let obj1={
    name:'Deepak',
    office:'Mindtree',
    branch:function(){
        // console.log("brang",`${this.office} Hyderabad`)
        return `${this.office} Hyderabad`
    }  

}
console.log(obj1.branch())

function GeneralCars(givenName,givenSpeed){
    this.name=givenName
    this.speed=givenSpeed,
    this.run=function(){
        return `This Car Runs at a speed of ${this.speed} kmph`
    }
}
c1=new GeneralCars('Nissan',240)
c2=new GeneralCars('Swift',98)
console.log(c1.name)
console.log(c2)
console.log(c1.run())

 
 