class TodoComponent {
    constructor(todoContainer,paginationContainer) {
        this.todoContainer = todoContainer
        this.paginationContainer = paginationContainer
        this.loading = false
        this.totalPages = null
        this.limit = 50
        this.currentPage = 0
        this.constructTodos_GroupBy()
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
            // this.constructTodos()
            this.constructTodos_GroupBy()
        }
    }
    todoUserList(todos){
        const userListContainer = document.createElement('ul')
        userListContainer.setAttribute('class','user-list')
        todos.forEach((user) => {
            const listItem = document.createElement('li')
            listItem.setAttribute('class','list-item')
            listItem.textContent = user.todo
            userListContainer.appendChild(listItem)
        })
        return userListContainer
    }
    todoCard(userId,todos) {
        const div = document.createElement('div')
        div.setAttribute('class',`todo todo-${userId}`)
        const title = document.createElement('div')
        title.setAttribute('class', `todo-title todo-title-${userId}`)
        title.textContent = `${userId}`
        const userListContainer = this.todoUserList(todos)
        div.appendChild(title)
        div.appendChild(userListContainer)
        return div
    }
    groupBy(todos){ 
        const userIdGroupBy = todos.reduce((prev,curr) => {
            const userId = curr.userId
            if(!prev[userId]) {
                prev[userId] = [curr]
            }else {
                prev[userId].push(curr)
            }
            return prev
        },{})
        return userIdGroupBy
    }
    async constructTodos_GroupBy() {
        const todos = await this.fetchTodos()
        const userIdList = this.groupBy(todos)
        console.log({userIdList})
        this.todoContainer.innerText = ''
        const fragement = document.createDocumentFragment()
        for(let [key,value] of Object.entries(userIdList)) {
            fragement.appendChild(this.todoCard(key,value))
        }
        this.todoContainer.appendChild(fragement)
    }
}
const todoContainer = document.querySelector('.todo-container')
const paginationContainer = document.querySelector('.pagination-container')
new TodoComponent(todoContainer,paginationContainer)

