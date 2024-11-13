function merge(arr, temp, left, mid, right) {
    let i = left;
    let j = mid + 1;  // Adjusted to mid + 1
    let k = left;
    let curr_count = 0;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k] = arr[i];
            i++;
        } else {
            // left > [3,5,6], right > [2,4,7,8]
            // let mid = 2 [index] and i = 1 [index] and j=3
            // So if arr[i] > arr[j] than (5>2 and 6>2) so m-i+1 > 2-1+1 = 2

            curr_count += (mid - i + 1);
            temp[k] = arr[j];
            j++;
        }
        k++;
    }

    // Remaining elements in the left half
    while (i <= mid) {
        temp[k] = arr[i];
        i++;
        k++;
    }

    // Remaining elements in the right half
    while (j <= right) {
        temp[k] = arr[j];
        j++;
        k++;
    }

    // Copy temp array to the original array
    for (let t = left; t <= right; t++) {
        arr[t] = temp[t];
    }

    return curr_count;
}

function inversions(arr, temp, l, r) {
    let count = 0;
    if (l < r) {
        let mid = Math.floor((l + r) / 2);
        count += inversions(arr, temp, l, mid);
        count += inversions(arr, temp, mid + 1, r);
        count += merge(arr, temp, l, mid, r);
    }
    return count;
}

function countInversions(arr) {
    let temp = new Array(arr.length).fill(0);
    return inversions(arr, temp, 0, arr.length - 1);
}


let arr = [24, 18, 38, 43, 14, 40, 1, 54];
console.log(countInversions(arr)); // Expected output: 12
