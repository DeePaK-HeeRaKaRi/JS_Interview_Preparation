
// class AnalyticsEvents {
//     constructor() {
//         this.events = [];
//         this.pendingEventsQueue = []
//         this.isPublishingEvent = false
//     }
//     // page/home
//     mapper(type,data) {
//         return {
//             type,
//             payload : {
//                 data:data,
//                 timeStamp : new Date().toLocaleTimeString()
//             }
//         }
//     }

//     // async postService(payload) {
//     //     const api = 'https://dummyjson.com'
//     //     try{
//     //         const response = await fetch(api, {
//     //             method : "POST", 
//     //             headers:{'Content-Type' :'application/json'},
//     //             body: JSON.stringify(payload)
//     //         })
//     //         if(!response.ok) {
//     //             console.error("Analytics Failed",response.status)
//     //         }
//     //     }catch(err) {
//     //         console.error({err})
//     //     }
//     // }

//     postService(payload) {
//         return new Promise((resolve,reject) => {
//             setTimeout(() => {
//                 resolve({status:"Success",data:payload})
//             },1000)
//         })
//     }

//     publishEvents() {
//         console.log("Publishing Events Started!!")
//         this.isPublishingEvent = true
//         return this.postService(this.events)
//             .then((res) => {
//                 console.log("Publishing Events Success!!",{res})
//             })
//             .catch((err) => {
//                 console.error("Publishing Events Failed!!",err)
//             })
//             .finally(() => {
//                 this.isPublishingEvent = false
//                 this.events = []
//                 this.events.push(...this.pendingEventsQueue)
//                 this.pendingEventsQueue = []
//             })
//     }

//     registerEvent(type,data) {  
//         const event = this.mapper(type,data)
//         if(this.isPublishingEvent) { // Lets say any event is added in b/w so it will go to pending queue
//             this.pendingEventsQueue.push(event)
//         }
//         else {
//             this.events.push(event)
//         }
//         console.log("Event has been Stored, will send all the stored events once triggered")
//     }

// }

// const analyticsEvents = new AnalyticsEvents()
// const event_1 = analyticsEvents.registerEvent("pageview","dashboard");
// const event_2 = analyticsEvents.registerEvent("click","button");
// analyticsEvents.publishEvents()

// const event_3 = analyticsEvents.registerEvent("footer","viewFooter");
// analyticsEvents.publishEvents()

class AnalyticsEvents {
    constructor(delay = 3000) {
      this.events = [];
      this.pendingEventsQueue = [];
      this.isPublishingEvent = false;
      this.interval = null;
      this.delay = delay;
      this.autoStartQueued = false; //Prevents multiple auto-starts within microtasks.

      // Failure handling
      this.failureCount = 0;
      this.maxFailures = 5;
      this.cooldownTimeout = null;
     queueMicrotask(() => this.startAutoPublish())
    }

    mapper(type, data) {
      return {
        type,
        payload: {
          data,
          timeStamp: new Date().toLocaleTimeString(),
        },
      };
    }
  
    postService(payload) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ status: "Success", data: payload });
        }, 1000);
      });
    }
  
    publishEvents() {
      if (this.events.length === 0) return Promise.resolve("No events to publish");
      console.log("⏳ Publishing Started...");
      this.isPublishingEvent = true;
      const currentBatch = [...this.events];
      this.events = [];
      return this.postService(currentBatch)
        .then((res) => {
          console.log("✅ Publishing Success:", res);
        })
        .catch((err) => {
            console.error("❌ Publishing Failed:", err);
            this.events.push(...currentBatch); // Retry later
            this.failureCount++;
      
            if (this.failureCount >= this.maxFailures) {
              console.warn(`🚫 Too many failures (${this.failureCount}). Pausing for 10 mins.`);
              this.stopAutoPublish();
      
              this.cooldownTimeout = setTimeout(() => {
                console.log("🔁 Resuming auto-publish after cooldown");
                this.failureCount = 0;
                this.startAutoPublish();
              }, 10 * 60 * 1000); // 10 minutes
            }
        })
        .finally(() => {
          this.isPublishingEvent = false;
          this.events.push(...this.pendingEventsQueue);
          this.pendingEventsQueue = [];
          // 🧹 Stop interval if no events left
          if (this.events.length === 0 && this.pendingEventsQueue.length === 0) {
            this.stopAutoPublish();
          }
        });
    }
  
    registerEvent(type, data) {
      const event = this.mapper(type, data);
      if (this.isPublishingEvent) {
        this.pendingEventsQueue.push(event);
      } else {
        this.events.push(event);
      }
      console.log("📦 Event Queued:", event);
        this.autoStartQueued = false;
        if (!this.interval && !this.autoStartQueued) { //Prevents duplicate microtasks being queued
            this.autoStartQueued = true;
            queueMicrotask(() => {

                this.startAutoPublish();
                this.autoStartQueued = false;
            });
        }
    }
    startAutoPublish() {
      if (!this.interval) {
        console.log("🚀 Auto-publish started");
        this.interval = setInterval(() => this.publishEvents(), this.delay);
      }
    }
    stopAutoPublish() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
        console.log("🛑 Auto-publish stopped");
      }
      if (this.cooldownTimeout) {
        clearTimeout(this.cooldownTimeout);
        this.cooldownTimeout = null;
        console.log("❌ Cooldown cleared");
      }
    }
  }
  

const analytics = new AnalyticsEvents(3000); // Every 3s

analytics.registerEvent("pageview", "homepage");
analytics.registerEvent("click", "buy_button");
// analytics.publishEvents()
analytics.registerEvent("scroll", "homepage");
analytics.registerEvent("footer", "viewed");

// After all are flushed and no more events, interval will stop itself

setTimeout(() => {
    analytics.registerEvent("nav", "navBar Viewed");
},4000)