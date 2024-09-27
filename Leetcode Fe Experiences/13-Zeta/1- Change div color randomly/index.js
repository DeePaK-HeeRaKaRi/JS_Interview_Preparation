
const container = document.getElementById('container')

container.addEventListener('click',() => {
    const getRandom = () => {
        return Math.floor(Math.random()*255)
    }
    // const r = Math.floor(Math.random()*255)
    // const g = Math.floor(Math.random()*255)
    // const b = Math.floor(Math.random()*255)
    // console.log(getRandom)
    // console.log({r,g,b})
    // container.style.backgroundColor = `rgb(${r},${g},${b})`
    container.style.backgroundColor = `rgb(${getRandom()},${getRandom()},${getRandom()})`
})

const table_container = document.getElementById('table_container')

const table = document.createElement('table')

const table_head = document.createElement('thead')
const table_body = document.createElement('tbody')
table.appendChild(table_head)
table.appendChild(table_body)
const n=10
const m=6
let row = document.createElement('tr')
for(let i=0;i<m;i++) {
    let row_header = document.createElement('th')
    row_header.innerText = `header - ${i+1}`
    row.appendChild(row_header)
    table_head.appendChild(row)
}

for(let i=0;i<n;i++) {
    let row = document.createElement('tr')
    for(let j=0;j<m;j++){
        let row_header = document.createElement('td')
        row_header.innerText = `Row - ${i+1} ${j+1}`
        row.appendChild(row_header)
        table_body.appendChild(row)
    }
    
}
table.style.border = '2'
table_container.appendChild(table)