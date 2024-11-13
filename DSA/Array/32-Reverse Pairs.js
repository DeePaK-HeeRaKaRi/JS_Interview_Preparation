function merge(arr, temp, left, mid, right) {
  let i = left;
  let j = mid + 1;

  // i > [12,19,25,40], j => [2,6,9]
  // # if all elements are satisfied on the right side so do not run until i is < m
  // #ex- [12,19,25,40] ,[2,6,9]
  // #here at 19 all right 3 elemnts will satisify,so 25 and 40 will also satisy all 3 elements 2*3=6
  // #so i=1 => (m-i(currentindex)-1) * n

  let count = 0;
   // Count reverse pairs
   while (i <= mid) {
    // Move j until arr[i] > 2 * arr[j]
    while (j <= right && arr[i] > 2 * arr[j]) {
        j++;
    }

    // If j exceeds right, all subsequent i will satisfy the condition for all j's
    if (j > right) {
        count += (mid - i + 1) * (right - mid);  // Bulk add count for the remaining pairs
        break;
    }

    // Count valid pairs
    count += (j - (mid + 1));
    i++;
}
  i = left;
  j = mid + 1;

  let k = left;
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      temp[k] = arr[i];
      i++;
    } else {
      temp[k] = arr[j];
      j++;
    }
    k++;
  }

  while (i <= mid) {
    temp[k] = arr[i];
    i++;
    k++;
  }

  while (j <= right) {
    temp[k] = arr[j];
    j++;
    k++;
  }

  for (let t = left; t <= right; t++) {
    arr[t] = temp[t];
  }

  return count;
}

function mergeSort(arr, temp, start, end) {
  let total = 0;
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    total += mergeSort(arr, temp, start, mid);
    total += mergeSort(arr, temp, mid + 1, end);
    total += merge(arr, temp, start, mid, end);
  }
  return total;
}
function reversePairs(arr) {
  let temp = new Array(arr.length).fill(0);
  return mergeSort(arr, temp, 0, arr.length - 1);
}

let arr = [2, 4, 3, 5, 1];
// arr = [1,3,2,3,1]
// arr = [12, 19, 25, 40, 2, 6, 9];
console.log(reversePairs(arr));



