window.myLocalStorage={
  // by default 30 days
    setItem(key,value,maxAge = 30*24*60*60*1000){
      let result={
        data:value
      }

      if(maxAge){
        result.expiryTime = maxAge + Date.now()
      }

      window.localStorage.setItem(key,JSON.stringify(result))
    },

    getItem(key){
      let result = JSON.parse(window.localStorage.getItem(key))
      if(result){
          if (result.expiryTime <= Date.now()) {
            window.localStorage.removeItem(key);
            return "Session has Expired";
          }
        return result;
      }
      return "No data present with the given key"
      
    },
    removeItem(key){
      window.localStorage.removeItem(key)
    },
    clear(){
      window.localStorage.clear()
    }
}
myLocalStorage.setItem('foo', 'bar', 1000);
setTimeout(() => {
  console.log(myLocalStorage.getItem("foo"));
}, 999);