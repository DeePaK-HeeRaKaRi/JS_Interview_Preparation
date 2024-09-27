
function cssSelector_nth(root,target) {
    let path = []
    while(root != target) {
        const nthChild = Array.from(target.parentNode.children).indexOf(target)+1
        console.log("🚀 ~ cssSelector ~ nth-Child:", nthChild)
        const tagName = target.tagName.toLowerCase()
        const selector = `${tagName}:nth-child(${nthChild})`
        path.unshift(selector)
        target = target.parentNode

        if(root == target) {
            const tagName = root.tagName.toLowerCase()
            const selector = `${tagName}[id="${root.id}"]`
            path.unshift(selector)
        }
    }
    return path.join(' > ')
}

// This uses If has ID, class name or else nth child

function cssSelector(root,target) {

    let path = []
    while(root != target) {
        console.log('🚀 ~ cssSelector ~ target:', target)
        let selector = target.tagName.toLowerCase()
        if(target.hasAttribute('id')){
            const getCurrId = target.getAttribute('id')
            selector += `[id="${getCurrId}"]`
        }
        else if(target.hasAttribute('class')){
            const getCurrClass = target.getAttribute('class')
            selector += `[class="${getCurrClass}"]`
        }
        else{
            const nthChild = Array.from(target.parentNode.children).indexOf(target)+1
            selector += `:nth-child(${nthChild})`
            
        }
        path.unshift(selector)
        target = target.parentNode

        if(root == target) {
            let selector = root.tagName.toLowerCase()
            if(root.hasAttribute('id')){
                const getCurrId = root.getAttribute('id')
                selector += `[id="${getCurrId}"]`
            }
            else if(root.hasAttribute('class')){
                const getCurrClass = root.getAttribute('class')
                selector += `[class="${getCurrClass}"]`
            }
            path.unshift(selector)
        }
        console.log("🚀 ~ cssSelector ~ path:", path)
    }
        
    return path.join(' > ')
}



const target = document.querySelector('#target')
const root = document.querySelector('#root')


// console.log(cssSelector_nth(root,target))

console.log(cssSelector(root,target))