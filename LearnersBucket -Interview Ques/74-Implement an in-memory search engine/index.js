class InMemorySearch {
  constructor() {
    this.entities = new Map();
  }
  addDocuments(key, ...values) {
    // console.log(key,...values)
    let getExisting = this.entities.get(key);
    if (!getExisting) {
      this.entities.set(key, [...values]);
    } else {
      this.entities.set(key, [...getExisting, ...values]);
    }
    // console.log(this.entities);
  }
  search(key, filterFn, orderByFN) {
    const documents = this.entities.get(key);
    if (!documents) {
      throw new Error(`No values are existing with given key - ${key}`);
    }
    console.log(filterFn);
    const filteredData = documents.filter((val) => filterFn(val));
    console.log(filteredData);

    const { param, order } = orderByFN;
    console.log(key, order);
    return  filteredData.sort((a, b) => {
      if (order) {
        return a[param] - b[param];
      } else {
        return b[param] - a[param];
      }
    });

  }
}

const searchEngine = new InMemorySearch();
searchEngine.addDocuments(
  "Movies",
  { name: "Avenger", rating: 8.5, year: 2017 },
  { name: "Deepak", rating: 8.6, year: 2022 },
  { name: "Black Panther", rating: 9.0, year: 2022 },
  { name: "Black Adam", rating: 8.7, year: 2022 },
  { name: "Jhon Wick 4", rating: 8.2, year: 2023 }
);
// searchEngine.addDocuments(
//   "Movies",
//   { name: "Avenger-1", rating: 8.5, year: 2017 },
//   { name: "Black Adam1", rating: 8.7, year: 2022 },
//   { name: "Jhon Wick 41", rating: 8.2, year: 2023 },
//   { name: "Black Panthe1r", rating: 9.0, year: 2022 }
// );
console.log(
  searchEngine.search("Movies", (e) => e.rating > 8.5, {
    param: "rating",
    order: false,
  })
);
