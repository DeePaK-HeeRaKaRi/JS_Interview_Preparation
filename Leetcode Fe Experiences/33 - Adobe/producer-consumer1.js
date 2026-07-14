class Broker {
    constructor() {
        // Master registry mapping IDs to their topic and callback: Map( id => { topic, callback } )
        this.subscriptions = new Map();
        // Index tracking which IDs belong to which topic: { topicName: Set([id1, id2]) }
        this.topics = {};
        this.subIdCounter = 0;
    }

    // Called by consumers to register interest
    registerSubscription(topic, callback) {
        this.subIdCounter++;
        const id = `sub_${this.subIdCounter}`;

        // 1. Store in the master registry
        this.subscriptions.set(id, { topic, callback });

        // 2. Add to the specific topic group index
        if (!this.topics[topic]) {
            this.topics[topic] = new Set();
        }
        this.topics[topic].add(id);

        return id;
    }

    // Called by producers to broadcast data
    broadcast(topic, payload) {
        const subscriberIds = this.topics[topic];
        if (!subscriberIds || subscriberIds.size === 0) return;

        // Deliver the payload to every registered callback for this topic
        subscriberIds.forEach(id => {
            const sub = this.subscriptions.get(id);
            if (sub) {
                sub.callback(payload);
            }
        });
    }

    // Called by consumers to stop listening
    removeSubscription(id) {
        const sub = this.subscriptions.get(id);
        if (!sub) return false;

        // 1. Remove from the topic index group
        const { topic } = sub;
        if (this.topics[topic]) {
            this.topics[topic].delete(id);
            if (this.topics[topic].size === 0) {
                delete this.topics[topic];
            }
        }

        // 2. Remove from master registry
        return this.subscriptions.delete(id);
    }
}

class Consumer {
    constructor(broker) {
        this.broker = broker;
    }

    subscribe(topic, callback) {
        // Ask the broker to subscribe, and return the ID it generates
        return this.broker.registerSubscription(topic, callback);
    }

    cancelSubscription(id) {
        // Pass the ID to the broker to tear down the connection
        return this.broker.removeSubscription(id);
    }
}

class Producer {
    constructor(broker) {
        this.broker = broker;
    }

    send(topic, payload) {
        // Tell the broker to broadcast this payload to all listeners
        this.broker.broadcast(topic, payload);
    }
}