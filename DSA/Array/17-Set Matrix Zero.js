function setMatrix(matrix) {
  console.log({ matrix });
  let m = matrix.length;
  let n = matrix[0].length;
  let row = new Array(m).fill(1);
  let col = new Array(n).fill(1);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] == 0) {
        row[i] = 0;
        col[j] = 0;
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (row[i] == 0 || col[j] == 0) {
        matrix[i][j] = 0;
      }
    }
  }
  return matrix;
}

function setMatrix_2(matrix) {
  let m = matrix.length;
  let n = matrix[0].length;

  let col1 = 1;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] == 0) {
        if (j == 0) {
          col1 = 0;
        } else {
          matrix[0][j] = 0;
          matrix[i][0] = 0;
        }
      }
    }
  }

  //convert to 0's from 1,1
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] == 0 || matrix[0][j] == 0) {
        matrix[i][j] = 0;
      }
    }
  }

  //Solve first row and first col at last, otherwise the values may led to incorrect results
  //solve row first i.e., mat[0][0] == 0
  if (matrix[0][0] == 0) {
    for (let j = 0; j < n; j++) {
      matrix[0][j] = 0;
    }
  }

  if (col1 == 0) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }

  return matrix;
}

let matrix = [
  [0, 1, 1, 1],
  [1, 0, 1, 1],
  [1, 1, 0, 1],
  [1, 1, 1, 1],
];

// console.log(setMatrix(matrix))

console.log(setMatrix_2(matrix));
