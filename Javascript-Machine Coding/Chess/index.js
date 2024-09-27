const board = document.querySelector(".chess_board");
function createCell() {
  for (let i = 1; i <= 8; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "row";
    board.appendChild(rowDiv);
  }

  const allRows = document.querySelectorAll(".row");

  for (let i = 0; i < allRows.length; i++) {
    for (let j = 0; j <= 7; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      if (i % 2 == 0) {
        if (j % 2 == 0) {
          cell.classList.add("black_cell");
        } else {
          cell.classList.add("white_cell");
        }
      } else {
        if (j % 2 == 1) {
          cell.classList.add("black_cell");
        } else {
          cell.classList.add("white_cell");
        }
      }
      allRows[i].append(cell);

      // adding Event Listener
      cell.addEventListener("click", () => {
        onClickHandler(i, j);
      });
    }
  }
}
createCell();

function onClickHandler(i, j) {
  const rows = document.querySelectorAll(".row");
  const rowSize = rows.length;
  const colSize = rows[0].querySelectorAll(".cell").length;

  //to remove the previously selected red cells
  for (let r = 0; r < rowSize; r++) {
    let curRow = rows[r];
    for (let c = 0; c < colSize; c++) {
      let curCol = curRow.querySelectorAll(".cell")[c];
      curCol.classList.remove("red_cell");
      curCol.classList.remove("source_cell");
    }
  }
  let selectedRow;
  let selectedCol;

  // highlight source cell
  selectedRow = rows[i];
  selectedCol = selectedRow.querySelectorAll(".cell")[j];
  selectedCol.classList.add("source_cell");

  // top left diagonal
  let row = i;
  let col = j;
  while (row >= 0 && col >= 0) {
    selectedRow = rows[row];
    selectedCol = selectedRow.querySelectorAll(".cell")[col];
    // selectedCol=selectedRow.childNodes[col]
    selectedCol.classList.add("red_cell");
    row -= 1;
    col -= 1;
  }

  // top right diagonal
  row = i;
  col = j;
  while (row >= 0 && col < colSize) {
    selectedRow = rows[row];
    selectedCol = selectedRow.querySelectorAll(".cell")[col];
    selectedCol.classList.add("red_cell");
    row -= 1;
    col += 1;
  }

  // down right diagonal
  row = i;
  col = j;
  while (row < rowSize && col < colSize) {
    selectedRow = rows[row];
    selectedCol = selectedRow.querySelectorAll(".cell")[col];
    selectedCol.classList.add("red_cell");
    row += 1;
    col += 1;
  }

  // down left diagonal
  row = i;
  col = j;
  while (row < rowSize && col >= 0) {
    selectedRow = rows[row];
    selectedCol = selectedRow.querySelectorAll(".cell")[col];
    selectedCol.classList.add("red_cell");
    row += 1;
    col -= 1;
  }
}

function run() {
  let currentIndex = 0;
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      setTimeout(() => {
        onClickHandler(i, j);
      }, currentIndex * 1000);
      currentIndex++;
      console.log(currentIndex);
    }
  }
}
// to run from (0,0) for every sec
run();
