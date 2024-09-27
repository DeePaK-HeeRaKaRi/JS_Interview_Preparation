const carousel = document.getElementById("carousel");
const leftController = document.querySelector(".left-controller");
const rightController = document.querySelector(".right-controller");
const imageContainer = document.querySelector(".image-container");
const dotContainer = document.querySelector(".dot-container");
const showLeftSlider = document.querySelector(".showLeftSlider");
const showRightSlider = document.querySelector(".showRightSlider");
const stopSlider = document.querySelector(".stopSlider");

class Carousel {
  constructor(
    carousel,
    images,
    leftHandle,
    rightHandle,
    selected,
    imageContainer,
    dotContainer,
    showLeftSlider,
    showRightSlider,
    stopSlider
  ) {
    this.carousel = carousel;
    this.images = images;
    this.leftHandle = leftHandle;
    this.rightHandle = rightHandle;
    this.selected = selected;
    this.imageContainer = imageContainer;
    this.dotContainer = dotContainer;
    this.showLeftSlider = showLeftSlider;
    this.showRightSlider = showRightSlider;
    this.stopSlider = stopSlider;
    this.isStartedLeftSLider = false;
    this.isStatedRightSlider = false;
    this.prev = 0;
    this.leftSliderInterval = null;
    this.rightSliderInterval = null;
    this.addListeners();
    this.placeDots();    
  }

  addListeners() {
    this.leftHandle.addEventListener("click", () => this.swipeLeft());
    this.rightHandle.addEventListener("click", () => this.swipeRight());
    this.showLeftSlider.addEventListener("click", () =>
      this.handleLeftSlider()
    );
    this.showRightSlider.addEventListener("click", () =>
      this.handleRightSlider()
    );
    this.stopSlider.addEventListener("click", () => this.handleStopSlider());
  }

  handleStopSlider() {
    if (this.leftSliderInterval) {
      clearInterval(this.leftSliderInterval);
    }
    if (this.rightSliderInterval) {
      clearInterval(this.rightSliderInterval);
    }

    if(this.showRightSlider.disabled) this.showRightSlider.disabled=false

    if(this.showLeftSlider.disabled) this.showLeftSlider.disabled=false

    this.stopSlider.disabled=true
  }

  disableButtons(){
    this.showRightSlider.disabled = true;
    this.showLeftSlider.disabled = true;
  }

  enableStopButton(){
    this.stopSlider.disabled=false
  }

  handleLeftSlider() {
    this.disableButtons()
    this.enableStopButton()
    this.leftSliderInterval = setInterval(() => {
      this.swipeLeft();
    }, 1000);
  }

  handleRightSlider() {
    this.disableButtons();
    this.enableStopButton();
    this.rightSliderInterval = setInterval(() => {
      this.swipeRight();
    }, 1000);
  }

  swipeLeft() {
    this.selected -= 1;
    if (this.selected < 0) {
      this.selected = this.images.length - 1;
    }
    this.placeImage();
    this.highlightSwipedDot();
  }

  swipeRight() {
    this.selected += 1;
    if (this.selected == this.images.length) {
      this.selected = 0;
    }
    this.placeImage();
    this.highlightSwipedDot();
  }

  placeImage() {
    if (this.imageContainer.children) {
      this.imageContainer.children[0].src = this.images[this.selected];
    }
  }

  placeDots() {
    for (let i = 0; i < this.images.length; i++) {
      const element = document.createElement("div");
      element.classList.add("custom-dot");
      element.setAttribute("data-index", i);
      element.addEventListener("click", (e) => this.highlightSelectedDot(e, i));
      this.dotContainer.appendChild(element);
    }
  }

  highlightSelectedDot(event, i) {
    // if the same dot is clicked again than no need to perform any operation
    if (this.prev != i) {
      this.prev = i;
      //remove active class from all dots and add to the selected one
      this.removeHighlightedDot();

      this.appendDotForSelectedImage(event.target);

      // place the dataset index image
      this.selected = +event.target.dataset.index;
      this.placeImage();
    }
  }

  appendDotForSelectedImage(targetDiv) {
    const element = document.createElement("div");
    element.classList.add("add-dot");
    targetDiv.appendChild(element);
  }

  removeHighlightedDot() {
    const arr = [...this.dotContainer.children];
    arr.forEach((val, ind) => {
      if (val.children.length > 0) {
        val.removeChild(val.firstChild);
      }
    });
  }
  highlightSwipedDot() {
    this.removeHighlightedDot();
    const arr = [...this.dotContainer.children];

    // if the index and dataset index has equal than highlight the dot at that particular index
    arr.forEach((val, i) => {
      const hasDataIndex = val.hasAttribute("data-index");
      const dataIndex = val.getAttribute("data-index");
      if (+dataIndex == this.selected) {
        this.appendDotForSelectedImage(val);
        return;
      }
    });
  }
}

const Images = [
  "./Images/1.jpg",
  "./Images/2.png",
  "./Images/3.jpeg",
  "./Images/4.jpg",
  "./Images/5.jpg",
];
const currentSelected = 0;
 
new Carousel(
  carousel,
  Images,
  leftController,
  rightController,
  currentSelected,
  imageContainer,
  dotContainer,
  showLeftSlider,
  showRightSlider,
  stopSlider,
);

