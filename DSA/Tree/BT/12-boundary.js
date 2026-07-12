 
class Solution {
  boundary(root) {
    //your goes code here
        let res = [];

        function leftBoundary(node) {
            let curr = node.left;
            while (curr) {
                if (curr.left === null && curr.right === null) {
                    break;
                } else {
                    res.push(curr.data);
                }
                if (curr.left) {
                    curr = curr.left;
                } else {
                    curr = curr.right;
                }
            }
        }

        function leafNodes(node) {
            if (node === null) {
                return;
            }
            if (node.left === null && node.right === null) {
                res.push(node.data);
            }
            leafNodes(node.left);
            leafNodes(node.right);
            // if (node.left) {
            //     leafNodes(node.left);
            // }
            // if (node.right) {
            //     leafNodes(node.right);
            // }
        }

        function rightBoundary(node) {
            let curr = node.right;
            let r1 = [];
            while (curr) {
                if (curr.left === null && curr.right === null) {
                    break;
                } else {
                    r1.push(curr.data);
                }
                if (curr.right) {
                    curr = curr.right;
                } else {
                    curr = curr.left;
                }
            }
            for (let i = r1.length - 1; i >= 0; i--) {
                res.push(r1[i]);
            }
        }

        if (root === null) {
            return res;
        }

        res.push(root.data);

        if (root.left === null && root.right === null) {
            return res;
        } else {
            leftBoundary(root);
            leafNodes(root);
            rightBoundary(root);
            return res;
        }
  }
}