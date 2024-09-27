// Really depends on what your application needs to do. Having the cache built in the code here is obviously just for example purposes, 
// but if you had a real life web application that lived on a real server, yeah you probably would need to implement the cache in a different way (like using a Redis instance as the proxy, or using browser cookies etc). 
// The cache is more just the idea, how you implement it is completely up to you.

function CryptocurrencyAPI(){
    this.getValue=function(coin){
        console.log('Calling External API...')
        switch(coin){
            case "Bitcoin":
                return "$8,500"
            case "Litecoin":
                return "$70"
            case "Ethereum":
                return "$175"
        }
    }
}

function ProxyCryptoCurrency(){
    this.api=new CryptocurrencyAPI()
    this.cache={}
    this.response=function(coin){
        if(this.cache[coin]==null){
            this.cache[coin]=this.api.getValue(coin)
            return this.cache[coin]
        }else{
            console.log("Fetching from Cache...")
            return this.cache[coin]
        }
        
    }
}
// every time it will call external api 
// const api=new CryptocurrencyAPI()
// console.log(api.getValue("Bitcoin"))
// console.log(api.getValue("Litecoin"))
// console.log(api.getValue("Ethereum"))

const proxy=new ProxyCryptoCurrency()
// so if there are 1000s of requests dont dirctly call from api first check in cache if not call external api
console.log(proxy.response("Bitcoin"))
console.log(proxy.response("Litecoin"))
console.log(proxy.response("Ethereum"))
console.log(proxy.response("Bitcoin"))
console.log(proxy.response("Litecoin"))
console.log(proxy.response("Ethereum"))