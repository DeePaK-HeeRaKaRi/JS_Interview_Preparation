class ProgressController {
    constructor(inner, text, duration = 5000) {
        this.inner = inner;
        this.text = text;
        this.duration = duration;

        this.startTime = null;
        this.elapsedBeforePause = 0;
        this.rafId = null;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;

        const animate = (timestamp) => {
            if (!this.startTime) {
                this.startTime = timestamp - this.elapsedBeforePause;
            }

            const elapsed = timestamp - this.startTime;
            this.elapsedBeforePause = elapsed;

            const progress = Math.min(elapsed / this.duration, 1);
            const percent = Math.floor(progress * 100);

            this.inner.style.transform = `translateX(${percent - 100}%)`;
            this.text.innerText = `${percent}%`;

            if (progress < 1 && this.isRunning) {
                this.rafId = requestAnimationFrame(animate);
            }
        };

        this.rafId = requestAnimationFrame(animate);
    }

    stop() {
        this.isRunning = false;
        cancelAnimationFrame(this.rafId);
    }

    resume() {
        if (this.isRunning) return;
        this.isRunning = true;

        const animate = (timestamp) => {
            if (!this.startTime) {
                this.startTime = timestamp - this.elapsedBeforePause;
            }

            const elapsed = timestamp - this.startTime;
            this.elapsedBeforePause = elapsed;

            const progress = Math.min(elapsed / this.duration, 1);
            const percent = Math.floor(progress * 100);

            this.inner.style.transform = `translateX(${percent - 100}%)`;
            this.text.innerText = `${percent}%`;

            if (progress < 1 && this.isRunning) {
                this.rafId = requestAnimationFrame(animate);
            }
        };

        this.rafId = requestAnimationFrame(animate);
    }

    reset() {
        this.stop();
        this.startTime = null;
        this.elapsedBeforePause = 0;
        this.inner.style.transform = `translateX(-100%)`;
        this.text.innerText = `0%`;
    }
}