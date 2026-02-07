//https://leetcode.com/discuss/post/5994275/Atalassian-or-SDE2-or-Reject/

 

class Store {
  constructor() {
    this.data = new Map();       // timestamp -> [{ price, index }]
    this.checkpoints = new Map(); // checkpoint -> index
    this.counter = 0;            // global insertion index
  }

  add(timestamp, price, checkpoint) {
    this.counter++;

    if (!this.data.has(timestamp)) {
      this.data.set(timestamp, []);
    }

    this.data.get(timestamp).push({
      price,
      index: this.counter
    });

    if (checkpoint !== undefined) {
      this.checkpoints.set(checkpoint, this.counter);
    }
  }

  highestPrice(timestamp, checkpoint) {
    if (!this.data.has(timestamp)) return null;

    const entries = this.data.get(timestamp);

    // No checkpoint → consider all entries
    if (checkpoint === undefined) {
      return Math.max(...entries.map(e => e.price));
    }

    const checkpointIndex = this.checkpoints.get(checkpoint);
    if (checkpointIndex === undefined) return null;

    let max = -Infinity;

    for (const { price, index } of entries) {
      if (index <= checkpointIndex) {
        max = Math.max(max, price);
      }
    }

    return max === -Infinity ? null : max;
  }
}

const s = new Store();

s.add(1, 1);
s.add(1, 4);
s.add(1, 2);
s.add(1, 3, 'a');
s.add(1, 6);
s.add(1, 7);
s.add(1, 8, 'b');

console.log(s.highestPrice(1));       // 8
console.log(s.highestPrice(1, 'a'));  // 4
console.log(s.highestPrice(1, 'b'));  // 8
