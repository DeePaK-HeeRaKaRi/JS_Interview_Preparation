function alienOrder(words, K) {
    let indegree = new Array(K).fill(0);
    let adjList = Array.from({ length: K }, () => []);
    let queue = [];

    for (let i = 0; i < words.length - 1; i++) {
        let s1 = words[i];
        let s2 = words[i + 1];
        let len = Math.min(s1.length, s2.length);
        
        for (let j = 0; j < len; j++) {
            if (s1[j] !== s2[j]) {
                let u = s1.charCodeAt(j) - 97;
                let v = s2.charCodeAt(j) - 97;
                adjList[u].push(v);
                break;
            }
        }
    }

    for (let i = 0; i < K; i++) {
        for (let j of adjList[i]) {
            indegree[j]++;
        }
    }

    for (let i = 0; i < K; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }

    let ans = "";
    while (queue.length > 0) {
        let t = queue.shift();
        ans += String.fromCharCode(t + 97);
        
        for (let i of adjList[t]) {
            indegree[i]--;
            if (indegree[i] === 0) {
                queue.push(i);
            }
        }
    }

    return ans;
}
