function Events() {
    this.subscriptionList = new Map()
    this.subscriptionOnceList = new Map()
    this.subscriptionOnceAsyncList = new Map();

    this.subscribe = function(name,callback){
        if(!this.subscriptionList.has(name)) {
            this.subscriptionList.set(name, [callback]);
        }else {
            const existingCallbacks = this.subscriptionList.get(name)
            this.subscriptionList.set(name,[...existingCallbacks,callback])
        }

        return {
            remove: () => {
                const existingCallbacks = this.subscriptionList.get(name)
                console.log('---------existingCallbacks',existingCallbacks,name)
                // here it will rember the callback even after the execution is completed ,clousere
                const filtered = existingCallbacks.filter((e) => e!==callback)
                this.subscriptionList.set(name,filtered)
            }
        }
    }
    this.publish = function(name,data) { 
        const callbacks= this.subscriptionList.get(name) || []
        callbacks.forEach((e) => {
            e.call(this,data)
        })

        const subscribeOnceCallbacks = this.subscriptionOnceList.get(name) || []
        // console.log(subscribeOnceCallbacks)
        subscribeOnceCallbacks.forEach((e) => {
            e(data)
        })
        // console.log(`this.subscriptionOnceList`, this.subscriptionOnceList);
        this.subscriptionOnceList.set(name, []);

        // const subscribeOnceAsyncCallbacks =this.subscribeOnceAsyncList.get(name) || [];
        // subscribeOnceAsyncCallbacks.forEach((e) => {
        //   e(data);
        // });

        // this.subscribeOnceAsyncList.set(name, []);
    }

    this.publishAll=function(data){
        const entries = this.subscriptionList.entries()
         for (let [key, value] of entries) {
            value.forEach((e) => {
                e(data)
            })
         }
    }

    this.subscribeOnce = function (name,callback) {
         if (!this.subscriptionOnceList.has(name)) {
           this.subscriptionOnceList.set(name, [callback]);
         } else {
           const existingCallbacks = this.subscriptionOnceList.get(name);
           this.subscriptionOnceList.set(name, [...existingCallbacks, callback]);
         }

    }

    this.subscribeOnceAsync = async function(name) {
        return new Promise((resolve,reject) => {
            if (!this.subscriptionOnceAsyncList.has(name)) {
              this.subscriptionOnceAsyncList.set(name, [callback]);
            } else {
              const existingCallbacks = this.subscriptionOnceAsyncList.get(name);
              this.subscriptionOnceAsyncList.set(name, [...existingCallbacks,callback,]);
            }
        })
    }

    this.getAllSubscriptionList = function(){
        for(let [key,value] of this.subscriptionList){
            console.log('----------ket,value',key,value)
        }
        return this.subscriptionList
    }

}

const events = new Events();

const newUserNewsSubscription = events.subscribe("new-user", function (
  payload
) {
    const b=10
  console.log(`Sending Q1 News to: ${payload}`);
});
console.log('-newUserNewsSubscription',newUserNewsSubscription)
// events.publish("new-user", "Jhon");

const newUserNewsSubscription2 = events.subscribe("new-user", function (
  payload
) {
  console.log(`Sending Q2 News to: ${payload}`);
});

events.publish("new-user", "Doe");
events.publish("new-user", "Jhon");

newUserNewsSubscription.remove();
events.publish("new-user", "Doe");
// const newUserNewsSubscription3 = events.subscribe(
//   "new-user1",
//   function (payload) {
//     console.log(`Sending Q3 News to: ${payload}`);
//   }
// );

events.publishAll('foo')

// newUserNewsSubscription.remove();
// Upto here simple implementation for pubs sub is done

// // events.publish("new-user", "Foo");
events.getAllSubscriptionList();

// ------------------------------------------
// events.subscribeOnce("new-user", function (payload) {
//   console.log(`I am invoked once ${payload}`);
// });

// events.publish("new-user", "Foo Once");
// events.publish("new-user", "Foo Twice");

// events.subscribeOnceAsync("new-user").then(function (payload) {
//   console.log(`I am invoked once ${payload}`);
// });

// events.publish("new-user", "Foo Once Async");
