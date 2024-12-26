import { tableData } from "./data.js"
class address {
    constructor(tableContainer,footerContainer,table_Data,table_header_data) {
        this.tableContainer = tableContainer
        this.footerContainer = footerContainer
        this.table_Data = table_Data
        this.total_pages = table_Data.length
        this.table_header_data = table_header_data
        this.table = document.createElement('table')
        this.page = 0
        this.limit = 5
        this.currTableData = []
        this.updateTableData(this.page);
        this.createTableHead()
        this.createTableBody()
        this.tableContainer.appendChild(this.table)

        this.createFooter()

        this.total_pages = Math.ceil(this.table_Data.length / this.limit);
    }

    updateTableData(page){
        const start = page*this.limit
        const end = start + this.limit
        this.currTableData = this.table_Data.slice(start, end)

    }
    createTableHead() {
        const thead = document.createElement('thead')
        const tr = document.createElement('tr')
        for(let i of this.table_header_data) {
            console.log({i})
            const th = document.createElement('th')
            th.textContent = i
            tr.appendChild(th)
        }
        console.log({tr})
        thead.appendChild(tr)
        this.table.appendChild(thead)
    }

    createTableBody() {
        const tBody = document.createElement('tbody')
        tBody.setAttribute('class','table-body')
        for(let data of this.currTableData) {
            const tr = document.createElement('tr')
            for(let key of Object.keys(data)) {
                const td = document.createElement('td')
                td.textContent = data[key] ? data[key] : 'Data Not available'
                tr.appendChild(td)
            }
            tBody.appendChild(tr)
        }
        this.table.appendChild(tBody)
    }

    setButtonAttributes(button,value){
        console.log({button,value})
        button.setAttribute('type','button')
        button.setAttribute('class',value)
        button.textContent = value;
    }

    disablePrevButtonHandler(){
        if(this.page <= 0) {
            this.prevButton.setAttribute('disabled',true) //Its a boolean value
        }else {
            this.prevButton.removeAttribute('disabled') 
        }
    }


    disableNextButtonHandler() {
        if(this.page >= this.total_pages-1) {
            this.nextButton.setAttribute('disabled',true)
        }
        else {
            this.nextButton.removeAttribute('disabled')
        }
    }

    disableButtonHandler() {
        
        this.disablePrevButtonHandler()
        this.disableNextButtonHandler()
    }

    resetTableBody() {
        const tableBody = document.querySelector('.table-body')
        // delete tableBody
        tableBody.remove()
    }

    prevClickHandler() {
        this.resetTableBody()
        this.page -= 1
        this.disableButtonHandler()
        this.updateTableData(this.page)
        this.createTableBody()        
    }

    nextClickHandler() {
        this.resetTableBody()
        
        this.page += 1
        this.disableButtonHandler()
        this.updateTableData(this.page)
        this.createTableBody()
    }
    createFooter() {
        this.prevButton = document.createElement('button');
        this.nextButton = document.createElement('button');
        this.footerHandler()
    }

    footerHandler() {
        this.setButtonAttributes(this.prevButton,'Prev')
        this.setButtonAttributes(this.nextButton,'Next')
        this.prevButton.addEventListener('click',() => this.prevClickHandler())
        this.nextButton.addEventListener('click',() => this.nextClickHandler())
        this.footerContainer.appendChild(this.prevButton)
        this.footerContainer.appendChild(this.nextButton)
        this.disableButtonHandler()
    }   
}

const tableContainer = document.querySelector('.table-container')
const table_Data = tableData
console.log(table_Data)
const table_header_data = Object.keys(table_Data[0])
const footerContainer = document.querySelector('.footer-container')
new address(tableContainer,footerContainer,table_Data,table_header_data)