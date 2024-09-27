import { filtersData } from "./Data/index.js";

const getInputBody = (data) => {
  const inputBody = document.createElement("div");
  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = `${data.filterID}`;
  input.value = `${data.filterID}`;
  // input.classList.add('input')
  input.setAttribute("class", "input");

  const label = document.createElement("label");
  label.setAttribute("for", `${data.filterID}`);
  label.class = "checkbox-label";
  label.innerHTML = `${data.filterName}`;
  inputBody.appendChild(input);
  inputBody.appendChild(label);

  return inputBody;
};

const createFilters = (filtersData) => {
  const filtersBody = document.querySelector(".filtersBody");
  filtersData.forEach((data) => {
    const getInput = getInputBody(data);
    filtersBody.appendChild(getInput);
  });
  return filtersBody;
};
const getFiltersBody = createFilters(filtersData);

const filterHandler = (allFilters) => {
  let checked = [];
  const getAllfiltersBody = Array.from(allFilters.children);
  getAllfiltersBody.forEach((filterBody) => {
    const t = filterBody.children[0];
    t.addEventListener("click", (e) => {
      const value = e.target.value;
      if (t.checked) {
        checked.push(value);
      } else if (!t.checked) {
        checked = checked.filter((val) => val !== value);
      }
      getCheckedFilters(checked);
    });
  });
};

filterHandler(getFiltersBody);

const getCheckedFilters = (checkedFilters) => {
  console.log("checked--------", checkedFilters, imagesData);
  const filterImages = imagesData.filter((val) =>
    checkedFilters.includes(val.imgID)
  );
  console.log(filterImages);
  renderImages(filterImages)
};

const getImageBody = (value) => {
  console.log(value);
  const div = document.createElement("div");
  div.setAttribute("class", "imageContainer");
  const img = document.createElement("img");
  img.setAttribute("class", "image");
  img.src = value.img;
  div.appendChild(img);
  return div;
};

const renderImages = (imagesData) => {
  const imagesBody = document.querySelector(".imagesBody");
  imagesBody.innerHTML = ''
  imagesData.forEach((val) => {
    const t = getImageBody(val);
    imagesBody.appendChild(t);
  });
};

const imagesData = [
  { img: "./Images/book-1.jpeg", imgID: "book1" },
  { img: "./Images/book-2.jpg", imgID: "book1" },
  { img: "./Images/building-1.jpg", imgID: "building2" },
  { img: "./Images/building-2.avif", imgID: "building2" },
  { img: "./Images/building-3.jpg", imgID: "building2" },
  { img: "./Images/company-1.png", imgID: "company3" },
  { img: "./Images/company-2.png", imgID: "company3" },
  { img: "./Images/company-3.jpeg", imgID: "company3" },
  { img: "./Images/company-4.jpg", imgID: "company3" },
  { img: "./Images/language-1.png", imgID: "language4" },
  { img: "./Images/language-2.webp", imgID: "language4" },
  { img: "./Images/language-3.jpeg", imgID: "language4" },
];
renderImages(imagesData, false);
