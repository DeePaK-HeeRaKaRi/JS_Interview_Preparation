const controller = new AbortController()
const signal = controller.signal
const download = document.querySelector('.download')
const abort = document.querySelector('.abort')

download.addEventListener("click",downloadHelper)
abort.addEventListener("click",()=>{
    controller.abort()
    console.log("Download Aborted",controller);
})
function downloadHelper(){
    console.log('download Helper')
    fetch("https://jsonplaceholder.typicode.com/photos",{signal})
    .then((response) => {
        console.log('Complete',response)
    })
    .catch((err) => {
        console.log(`Err ${err}`)
    })
}