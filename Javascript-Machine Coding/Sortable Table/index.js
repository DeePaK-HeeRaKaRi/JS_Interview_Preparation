const createTableHead = (columns) => {
  const tHead = document.createElement("thead");
  const tr = document.createElement("tr");
  columns.forEach((item, index) => {
    const th = document.createElement("th");
    th.textContent = item;
    th.setAttribute("class", "tHead");
    th.addEventListener("click", () => {
      onClickHandler(index, "asc");
    });
    tr.appendChild(th);
  });
  tHead.appendChild(tr);
  return tHead;
};

const createTableBody = (tableData) => {
  const tBody = document.createElement("tbody");
  tableData.forEach((data) => {
    const tr = document.createElement("tr");
    for (let key of Object.keys(data)) {
      const td = document.createElement("td");
      td.textContent = data[key];
      tr.appendChild(td);
    }
    tBody.appendChild(tr);
  });
  return tBody;
};

const columns = ["Rank", "Name", "Age", "Occupation"];
const getTableNode = document.querySelector(".table");
const tableHead = getTableNode.appendChild(createTableHead(columns));

console.log("🚀 ~ file: index.js:15 ~ tableHead:", tableHead);
const tableData = [
  {
    rank: 1,
    name: "DOM",
    age: 35,
    occupation: "Web Dev",
  },
  {
    rank: 2,
    name: "Rebeca",
    age: 29,
    occupation: "Teacher",
  },
  {
    rank: 3,
    name: "Jason",
    age: 23,
    occupation: "Backend Dev",
  },
  {
    rank: 4,
    name: "Marvik",
    age: 34,
    occupation: "FrontEnd Dev",
  },
  {
    rank: 5,
    name: "Bob",
    age: 35,
    occupation: "Web Dev",
  },
];
const tableBody = getTableNode.appendChild(createTableBody(tableData));

console.log("🚀 ~ file: index.js:63 ~ tableBody:", tableBody);
function onClickHandler(indexProperty) {
  const getColumnToSort = Object.keys(tableData[0])[indexProperty];
  console.log(
    "🚀 ~ file: index.js:74 ~ onClickHandler ~ getColumn:",
    getColumnToSort,
    indexProperty
  );
  const sortedTableData = tableData.sort(sortByProperty(getColumnToSort));
  const currentTableBody = getTableNode.children[1];
  const removeCurrTableBody = getTableNode.removeChild(currentTableBody);
  getTableNode.appendChild(createTableBody(sortedTableData));
}
function sortByProperty(property, order = "asc") {
  console.log("pro", property, order);
  if (order === "asc") {
    return function (a, b) {
      if (a[property] > b[property]) {
        return 1;
      } else if (a[property] < b[property]) {
        return -1;
      } else {
        return 0;
      }
    };
  } else if (order === "desc") {
    return function (a, b) {
      if (a[property] > b[property]) {
        return -1;
      } else if (a[property] < b[property]) {
        return 1;
      } else {
        return 0;
      }
    };
  }
}
// const sortedTableData = tableData.sort(sortByProperty('Occupation','asc'))
// console.log("🚀 ~ file: index.js:62 ~ sortedTableData:", sortedTableData)
