/*
class Observable {
    constructor() {
        this.observers = []
    }

    subscribe(callback) {
        if(typeof callback !== 'function') {
            throw new Error('Callback must be a function')
        }

        const observer = {callback: callback}
        this.observers.push(observer)

        return {
            unsubscribe : () => {
                const index = this.observers.indexOf(observer)
                if(index > -1) {
                    this.observers.splice(index, 1)
                }
                else {
                    throw new Error('Not found')
                }
            }
        }
    }

    notify(...data) {
        this.observers.forEach((observer) => {
            try{
                observer.callback(...data)
            }
            catch(err) {
                throw new Error('Error in observable callback', err)
            }
        })
    }

    countObservers(){
        return this.observers.length
    }
}
*/

class Observable {
    constructor() {
        this.observers = new Set()
    }

    subscribe(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function')
        }

        this.observers.add(callback)

        return {
            unsubscribe: () => {
                if (!this.observers.delete(callback)) {
                    throw new Error('Not found')
                }
            }
        }
    }

    notify(...data) {
        for (const callback of this.observers) {
            try {
                callback(...data)
            } catch (err) {
                console.error('Error in observable callback', err)
            }
        }
    }

    countObservers() {
        return this.observers.size
    }
}

const observable = new Observable()

const sub1 = observable.subscribe(function(data) {
    console.log('Sub-1', data)
})
const sub2 = observable.subscribe(function(data) {
    console.log('Sub-2', data)
})
const sub3 = observable.subscribe(function(data) {
    console.log('Sub-3', data)
})

console.log('Obserevr count', observable.countObservers())

console.log(observable.observers)
observable.notify('Broadcsat Messages') // sub1, sub2 sub 3 [broad cast mesage]

sub2.unsubscribe()

observable.notify('Another Broadcsat Messages') // sub1, sub 3 [Another broad cast mesage]
sub2.unsubscribe()