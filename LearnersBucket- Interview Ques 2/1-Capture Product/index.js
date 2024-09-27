// when user stops scrolling we need to capture the products that is visible on view port
// const getelement=document.querySelector('.blocks')
// const dimensions = getelement.getBoundingClientRect();
// console.log(dimensions) //here we will get top right left bottom

const checkEleInViewPort = (element) => {
    const getDimensions = element.getBoundingClientRect();
    // now detect element top>=0 and left>=0 and height<=vh and width<=vw
    const elementVW = window.innerWidth || document.documentElement.clientWidth
    const elementVH = window.innerHeight || document.documentElement.clientHeight;
    console.log(elementVW, elementVH);
    return getDimensions.top>=0 && getDimensions.left>=0 && getDimensions.right<=elementVW && getDimensions.bottom<=elementVH
}

const detect = () =>{
    const results=[]
    const getAllElements = document.querySelectorAll('.blocks')
    getAllElements.forEach((element)=>{
        if(checkEleInViewPort(element)){
            results.push(element.textContent)
        }
    })
    console.log(results)
}

const debounce=(func,delay)=>{
    let inDebunce
    return function(){
        let context=this
        let args =arguments
        clearTimeout(inDebunce)
        inDebunce=setTimeout(()=>{
            func.apply(context,args)
        },delay)
    }
}

const debounceDetect = debounce(detect,1000)
window.addEventListener('scroll',debounceDetect,false)