/*
Implement feature flag functionality > used to show different features to different users
Known as A/B testing [split testing]. Build a common utility on frontend that can be used by entire webpage to get the status of feature flag.
Assume the BE is pre-built and a mock function is provided for oit


To test diff types of variations may be hero section
1. hero section with image
2. hero section with video


Functional Reqs
1) getFeatureState should return the value of the provided feature flag
2) In Case, flag is missing in the response or there is an error, return the provided default value
3) getFeatureState should support caching with a ttl and minimizes calls to backend APIs

getFeatureState('show-pricing-v2')
.then(function(isEnabled) {
    if(isEnabled) {
        showPricingV2()
    }
    else{
        showOldPricing()
    }
})

getFeatureState("show-redesigned-dialog")
.then(function(isEnabled){
    if(isEnabled) {
        showredesignedDialog()
    }
})

https://excalidraw.com/#json=vAW9VwNJgcxd3PkcCicgT,_98Kcjahm3lAQb5huSAlnA 

*/

const SAMPLE_FEATURES = {
    show_dialog_box : true,
    enable_new_pricing : true,
}

const Cache = {
    featureFlags :{},
    timeStamp : null
}

const MAX_CACHE_TTL = 1000 * 2
console.log({MAX_CACHE_TTL})

let fetchInstance = null //For subsequent Calls
// Mocking the backend call

function fetchAllFeatures() {
    console.log("Call to BE")
    return new Promise((resolve,reject) => {
        setTimeout(() =>  resolve(SAMPLE_FEATURES) , 100)
    })
}


function getFeatureState(featureName, defaultValue) {
    const isCacheDataPresent = Object.keys(Cache.featureFlags).length
    // console.log({isCacheDataPresent},Object.keys(Cache.featureFlags))
    const isCacheValid = Date.now() - Cache.timeStamp < MAX_CACHE_TTL
    if(isCacheValid) {
        fetchInstance = null
    }
    if(isCacheValid && isCacheDataPresent) {
        console.log('Retun from cache')
        const value =  Cache.featureFlags.hasOwnProperty(featureName) ? Cache.featureFlags[featureName] : defaultValue
        return Promise.resolve(value)
    }
    /*
    fetchInstance = null
    pending
    rather then creating new promises
    queue then callbacks
    pending => resolved

    no need to set cache value the first call back will be setting cache
    */
    if(fetchInstance instanceof Promise) {
        console.log("For Sunsequent calls executing from fetchInstance, no BE required",{featureName})
        return fetchInstance
        .then((featureFlags) => {
            return featureFlags.hasOwnProperty(featureName) ? featureFlags[featureName] : defaultValue
        })
        .catch(() => defaultValue)
    }
    fetchInstance =  fetchAllFeatures()
    .then(featureFlags => {
        // console.log({featureFlags})
        // return featureFlags[featureName] ||  defaultValue ?
        // false || true > true So it is not the right approach

        Cache.featureFlags = featureFlags;
        Cache.timeStamp = Date.now();
        // console.log({Cache})
        return featureFlags.hasOwnProperty(featureName) ? featureFlags[featureName] : defaultValue
        // return Object.prototype.hasOwnProperty(featureFlags,featureName) ? featureFlags[featureName] : defaultValue
    })
    .catch(() => defaultValue)

    return fetchInstance
}

/*
make the first call
we get data in 100ms
store in cache
next call after 300 ms
we get data from cache

*/
getFeatureState('show_dialog_box',false)
.then((isEnabled) => {
    if(isEnabled) {
        console.log('Show_dialog_box enabled')
    }
    else{
        console.log('Show_dialog_box disabled')
    }
})

getFeatureState('show_pricing_v2',false)
.then((isEnabled) => {
    if(isEnabled) {
        console.log('show_pricing_v2 enabled')
    }
    else{
        console.log('show_pricing_v2 disabled')
    }
})

getFeatureState('show_editor',false)
.then((isEnabled) => {
    if(isEnabled) {
        console.log('show_editor enabled')
    }
    else{
        console.log('show_editor disabled')
    }
})

setTimeout(() => {
    getFeatureState('enable_new_pricing',false)
    .then((isEnabled) => {
        if(isEnabled) {
            console.log('enable_new_pricing enabled')
        }
        else{
            console.log('enable_new_pricing disabled')
        }
    })
},300)


setTimeout(() => {
    getFeatureState('enable_new_pricing',false)
    .then((isEnabled) => {
        if(isEnabled) {
            console.log('enable_new_pricing enabled')
        }
        else{
            console.log('enable_new_pricing disabled')
        }
    })
},3000)
// getFeatureState('show_dialog_box',false)