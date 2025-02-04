function inOrderSuccessor(root, x) {
    // code here
    let ceil = -1
    while(root) {
        // if(root.data > x.data) {
             
        // }
        if(x.data < root.data) {
            ceil = root.data
            root = root.left
        }
        else {
            root = root.right
        }
    }
    
    return ceil
}