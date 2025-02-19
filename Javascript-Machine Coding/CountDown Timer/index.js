class CountDownTimer {
  constructor(container, inputContainer, buttonCOntainer) {
    this.container = container;
    this.inputContainer = inputContainer;
    this.buttonCOntainer = buttonCOntainer;
    this.buildTimer();
    this.interval = null
  }

  createInputContainer(type) {
    const div = document.createElement("div");
    div.classList.add(`container__input--label`, `container__input--${type}`);

    const label = document.createElement("label");
    label.for = type;
    label.textContent = type;

    const input = document.createElement("input");
    input.id = type;
    input.placeholder = "00";
    input.maxLength = "2";
    input.type = "number";

    div.appendChild(label);
    div.appendChild(input);

    return div;
  }


  timer(hours,minutes,seconds ) {
    console.log(hours.value, minutes.value, seconds.value);
        // Ensure seconds are correctly converted to minutes
        if (seconds.value >= 60) {
          let extraMinutes = Math.floor(seconds.value / 60);
          seconds.value = seconds.value % 60;
          minutes.value = Number(minutes.value) + extraMinutes;
        }

        // Ensure minutes are correctly converted to hours
        if (minutes.value >= 60) {
          let extraHours = Math.floor(minutes.value / 60);
          minutes.value = minutes.value % 60;
          hours.value = Number(hours.value) + extraHours;
        }

        // Countdown logic
        if (seconds.value != 0) {
          seconds.value -= 1;
        } else if (seconds.value == 0 && minutes.value != 0) {
          seconds.value = 59;
          minutes.value -= 1;
        } else if (minutes.value == 0 && hours.value != 0) {
          minutes.value = 59;
          hours.value -= 1;
        }

        // Ensure formatting
        seconds.value = Number(seconds.value.toString().padStart(2, "0"));
        minutes.value = Number(minutes.value.toString().padStart(2, "0"));
        hours.value = Number(hours.value.toString().padStart(2, "0"));
  }


  handleClick(e, type) {
    const target = e.target;

    let hours = document.querySelector("#hours");
    let minutes = document.querySelector("#minutes");
    let seconds = document.querySelector("#seconds");
    const startButton = document.querySelector("#start");

    console.log({ hours, minutes, seconds });
    if (type === "start") {
      this.interval = setInterval(() => {
            this.timer(hours,minutes,seconds)
      }, 1000);
    }
  }
  createButton(type) {
    const button = document.createElement("button");
    button.classList.add(
      `container__button--label`,
      `container__button--${type}`
    );
    button.textContent = type;
    button.addEventListener("click", (e) =>
      this.handleClick(e, button.textContent)
    );
    return button;
  }

  buildTimer() {
    const hours = this.createInputContainer("hours");
    const minutes = this.createInputContainer("minutes");
    const seconds = this.createInputContainer("seconds");

    this.inputContainer.appendChild(hours);
    this.inputContainer.appendChild(minutes);
    this.inputContainer.appendChild(seconds);

    const Start = this.createButton("start");
    // const Stop = this.createButton('stop')
    const Reset = this.createButton("reset");

    this.buttonCOntainer.appendChild(Start);
    // this.buttonCOntainer.appendChild(Stop)
    this.buttonCOntainer.appendChild(Reset);

    this.container.appendChild(this.inputContainer);
    this.container.appendChild(this.buttonCOntainer);
  }
}

const container = document.querySelector(".container");
const inputContainer = document.querySelector(".container__input");
const buttonContainer = document.querySelector(".container__button");
new CountDownTimer(container, inputContainer, buttonContainer);
