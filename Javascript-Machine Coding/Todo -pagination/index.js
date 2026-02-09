class TodoComponent {
    constructor(todoContainer,paginationContainer) {
        this.todoContainer = todoContainer
        this.paginationContainer = paginationContainer
        this.loading = false
        this.totalPages = null
        this.limit = 10
        this.currentPage = 0
        this.constructTodos()
        // wrapper created ONCE
        this.throttledPageClick = this.createClickThrottle(this.handlePageClick,4)

    }
    async fetchTodos(){
        this.loading = true
        try {
            const response = await fetch(`https://dummyjson.com/todos?limit=${this.limit}&skip=${this.limit*this.currentPage}`)
            const data = await response.json()
            if(!this.totalPages) {
                this.totalPages = Math.ceil(data.total / this.limit)
                this.buildPagination()
            }
            return data.todos
        }  
        catch(err){
            console.error(err)
        } 
        finally{
            this.loading = false
        }
    }
    buildPageNumber(page){
        const paginationButton = document.createElement('button')
            paginationButton.setAttribute('class','pagination-button')
            paginationButton.setAttribute('id',page)
            paginationButton.textContent = page
            return paginationButton
    }
    buildPagination() {
        const pageNumbers =[...new Array(this.totalPages).keys()]
        const fragement = document.createDocumentFragment()
        pageNumbers.forEach((page) => {
            const pageNumber = this.buildPageNumber(page)
            fragement.appendChild(pageNumber)
        })
        this.paginationContainer.addEventListener('click',this.throttledPageClick)
        this.paginationContainer.appendChild(fragement)
    }

    createClickThrottle(fn, maxSameClicks = 4) {
        let counter = 0
        let lastPage=  null
        return (event) => {
             
            const { target } = event
            const page = parseInt(target.id)

            if (Number.isNaN(page)) return

            if (page === lastPage) {
                counter++
                if (counter <= maxSameClicks) {
                    console.log('Blocked duplicate click')
                    return
                }
            }

            fn.call(this, event)
            counter = 0
            lastPage = page
        }
    }

    handlePageClick(event){
        const {target} = event
        const {id,className} = target
        if(className == 'pagination-button') {
            this.currentPage = parseInt(id)
            this.constructTodos()
        }
    }
    todoCard(todo) {
        const div = document.createElement('div')
        div.setAttribute('class',`todo todo-${todo.id}`)
        const title = document.createElement('div')
        title.setAttribute('class', `todo-title todo-title-${todo.userId}`)
        title.textContent = `${todo.id} - ${todo.userId}`

        const description = document.createElement('div')
        description.setAttribute('class', `todo-description todo-description-${todo.userId}`)
        description.textContent = todo.todo

        div.appendChild(title)
        div.appendChild(description)
        return div
    }
    async constructTodos() {
        const todos = await this.fetchTodos()
        console.log({todos})
        this.todoContainer.innerText = ''
        const documentFragement = document.createDocumentFragment()
        todos.map((todo) => {
            const todoCard = this.todoCard(todo)
            documentFragement.appendChild(todoCard)
        })
        this.todoContainer.appendChild(documentFragement)
    }
}
const todoContainer = document.querySelector('.todo-container')
const paginationContainer = document.querySelector('.pagination-container')
new TodoComponent(todoContainer,paginationContainer)

/*
createClickThrottle(...) runs once

JS executes the function immediately

It creates:

let counter = 0
let lastPage = null


Then it returns a function

That returned function is:

(event) => {
  // uses counter & lastPage
}

this.throttledPageClick = <returned function>
So now:

this.throttledPageClick IS the inner function.

this.paginationContainer.addEventListener(
  'click',
  this.throttledPageClick
)
What the browser does internally:

element.onclick = function(event) {
  throttledPageClick(event)
}

So on every click:

Browser creates the event

Browser calls your function

Browser passes event as the argument

*/