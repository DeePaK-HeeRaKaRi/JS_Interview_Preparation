//https://leetcode.com/discuss/post/4265464/goldman-sachs-coderpad-by-anonymous_user-iwo9/

var intersect = function(nums1, nums2) {
    if (nums1.length > nums2.length) {
        return intersect(nums2, nums1);
    }

    const map = {};
    const result = [];

    for (const num of nums1) {
        map[num] = (map[num] || 0) + 1;
    }

    for (const num of nums2) {
        if (map[num] > 0) {
            result.push(num);
            map[num]--;
        }
    }

    return result;
};

console.log(intersect([1,1,2,2,2],[1,1,1,2,2,3,4,5]))
console.log(intersect([1,2,2,1],[2,2]))
console.log(intersect([4,9,5],[9,4,9,8,4]))