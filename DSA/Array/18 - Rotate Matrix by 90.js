var rotate = function (matrix) {
  let l = 0;
  let r = matrix.length - 1;
  
  let matrix_length = matrix.length
  // Reverse Matrix

  while (l < r) {
    [matrix[l], matrix[r]] = [matrix[r], matrix[l]];
    l++;
    r--;
  }

  //  Transpose matrix
  for(let i=0; i<matrix_length; i++) {
    for(let j=i+1;j<matrix.length; j++) {
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]
    }
  }

  return matrix

};
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(rotate(matrix));
