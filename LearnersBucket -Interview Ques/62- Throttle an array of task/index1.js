const throttle = (func, count, tasks, delay) => {
    let lastRun = null;
    let lastFunc = null;
    let queue = [...tasks]; // Initial task queue

    return function () {
        console.log("Button clicked");

        if (!lastRun) {
            // Execute immediately on first call
            func(queue.splice(0, count));
            lastRun = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRun >= delay) {
                    func(queue.splice(0, count));
                    lastRun = Date.now();
                }

                // If all tasks are processed, restart the queue
                if (queue.length === 0) {
                    console.log("All tasks completed. Restarting...");
                    queue = [...tasks];
                }
            }, Math.max(0, delay - (Date.now() - lastRun)));
        }
    };
};

const tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const btn = document.getElementById("button");

btn.addEventListener(
    "click",
    throttle((currTask) => {
        console.log("Processing:", currTask);
    }, 2, tasks, 2000)
);

const t = throttle((currTask) => {
    console.log("Processing:", currTask);
}, 2, tasks, 2000);

t();
t();
t();
t();
t();
t();
