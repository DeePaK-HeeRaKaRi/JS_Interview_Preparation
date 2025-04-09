class TodoComponent {
    constructor(todoContainer,paginationContainer) {
        this.todoContainer = todoContainer
        this.paginationContainer = paginationContainer
        this.loading = false
        this.totalPages = null
        this.limit = 10
        this.currentPage = 0
        this.constructTodos()
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
        this.paginationContainer.addEventListener('click',(event) => this.handlePageClick(event))
        this.paginationContainer.appendChild(fragement)
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
        const userIdList = this.groupBy(todos)
        console.log({userIdList})
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

