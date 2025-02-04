// var kthSmallest = function(root, k) {
//     let count = 0
//     let res = 0
//     function helper(root) {
//         if(root == null) return root

//         helper(root.left)

//         count++
//         if(count == k) {
//             res= root.val
//             return res
//         }

//         helper(root.right)
//     }

//     helper(root)
//     return res
// };

var kthSmallest = function(root,k) {
    let count = 0
    let curr = root
    while(curr) {
        if(curr.left == null) {
            count++
            if(count==k)  return curr.val
            curr = curr.right
        }
        else {
            let prev = curr.left
            while(prev.right && prev.right!=curr) {
                prev = prev.right
            }

            if(prev.right == null) {
                prev.right = curr
                curr = curr.left
            }
            else {
                prev.right = null
                count++
                if(count==k)  return curr.val
                curr = curr.right
            }
        }
    }
}