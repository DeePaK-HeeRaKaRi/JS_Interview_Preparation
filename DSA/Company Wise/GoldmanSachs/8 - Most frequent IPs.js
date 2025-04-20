//https://leetcode.com/discuss/post/949160/goldman-sachs-phone-most-frequent-ip-add-f9h5/
function mostFrequentIPs(lines) {
    const freq = new Map();
    let maxFreq = 0;
  
    // Step 1: Count IP frequencies
    for (const line of lines) {
      const ip = line.split(" ")[0];
      const count = (freq.get(ip) || 0) + 1;
      freq.set(ip, count);
      maxFreq = Math.max(maxFreq, count);
    }
  
    // Step 2: Collect IPs with max frequency
    const result = [];
    for (const [ip, count] of freq.entries()) {
      if (count === maxFreq) {
        result.push(ip);
      }
    }
  
    // Step 3: Return result
    return result.length === 1
      ? result[0]
      : result.sort().join(",");
  }
  
  // Example usage:
  const lines = [
    "10.0.0.1 - GET 2020-08-24",
    "10.0.0.1 - GET 2020-08-24",
    "10.0.0.2 - GET 2020-08-20",
    "10.0.0.2 - GET 2020-08-21"
  ];
  
  console.log(mostFrequentIPs(lines)); // Output: "10.0.0.1,10.0.0.2"
  