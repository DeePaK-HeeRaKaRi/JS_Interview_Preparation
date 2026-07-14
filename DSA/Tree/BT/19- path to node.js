// Javascript implementation to print
// the path from root to a given node
// in a binary tree
class Node
{
    constructor(data) 
    {
        this.left = null;
        this.right = null;
        this.data = data;
    }
}

// Returns true if there is a path from root 
// to the given node. It also populates  
// 'arr' with the given path 
let arr=[] //take a helper fun and move it
function hasPath(root, arr, x) 
{ 
    
    // If root is NULL 
    // there is no path 
    if (root == null) 
        return false; 
    
    // Push the node's value in 'arr' 
    arr.push(root.data);     
    
    // If it is the required node 
    // return true 
    if (root.data == x)     
        return true; 
    
    // Else check whether the required node lies 
    // in the left subtree or right subtree of  
    // the current node 
    if (hasPath(root.left, arr, x) || 
        hasPath(root.right, arr, x)) 
        return true; 
    
    // Required node does not lie either in the  
    // left or right subtree of the current node 
    // Thus, remove current node's value from  
    // 'arr'and then return false     
    arr.pop(); 
    return false;             
} 