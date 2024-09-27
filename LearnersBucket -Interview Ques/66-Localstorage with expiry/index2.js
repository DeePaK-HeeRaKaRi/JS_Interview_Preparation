let myLocalStorage = {
    setItem(key,value,maxAge) {
        let result = {
            data : value,
            expiryTime : maxAge + Date.now()
        }

        window.localStorage.setItem(key,JSON.stringify(result))
    },

    getItem(key) {
        const result =JSON.parse(window.localStorage.getItem(key))
        if(result) {
            if(Date.now() > result.expiryTime ) {
                window.localStorage.removeItem(key)
                return 'Localstorage has been expired'
            }
        }
    },
}

myLocalStorage.setItem('deepak','--SWE @ IVANTI--',1000)
setTimeout(() => {
    myLocalStorage.getItem('deepak')
},1000)
