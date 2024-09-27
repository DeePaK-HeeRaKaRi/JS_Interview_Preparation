// The Strategy pattern is a behavioral design pattern that enables you to define a group (or family) of closely-related algorithms (known as strategies). 
// The strategy pattern allows you to swap strategies in and out for each other as needed at runtime.
function Fedex(){
    this.calculate=(package)=>{
        return 20*package.weight
    }
}
function UPS(){
    this.calculate=(package)=>{
        return 10*package.weight
    }
}

function USPS(){
    this.calculate=(package)=>{
        return 30*package.weight
    }
}

function Shipping(){
    this.company=""
    this.setStrategy=(company)=>{
        this.company=company
    }
    
    this.calculate=(package)=>{
        return this.company.calculate(package)
    }
}
const fedEx=new Fedex()
const ups=new UPS()
const usps=new USPS()
const shipping=new Shipping()
const package={from:"hyderabad",to:"delhi",weight:30}

shipping.setStrategy(fedEx)
console.log("Fedex value "+shipping.calculate(package))

shipping.setStrategy(ups)
console.log("UPS value "+ shipping.calculate(package))

shipping.setStrategy(usps)
console.log("USPS Value "+ shipping.calculate(package))
