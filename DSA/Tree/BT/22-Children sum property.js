/*
rootval =left + right,If condition doesnt satisfy increment left&right
*/

function child(root){
    if(root==null) return null

    let curr_sum=0
    if(root.left){
        curr_sum+=root.left.val
    }
    if(root.right){
        curr_sum+=root.right.val
    }

    if(curr_sum>=root.val){
        root.val=curr_sum
    }
    else{
        if(root.left){
            root.left.val=curr_sum
        }
        if(root.right){
            root.right.val=curr_sum
        }
    }

    child(root.left)
    child(root.right)

    //So once the tracerse is done,update the root
    let updated_sum=0
     if(root.left){
        updated_sum+=root.left.val
    }
    if(root.right){
        updated_sum+=root.right.val
    }

    if(root.left || root.right){
        root.val=updated_sum
    }

    return root
}