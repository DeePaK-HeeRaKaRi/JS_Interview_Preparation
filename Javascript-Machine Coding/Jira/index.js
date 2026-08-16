/*
    CRUD of Tasks
    Drag & Drop
*/
let draggedCard = null
const openModalButtons = document.querySelectorAll('.open-modal')
const formModal = document.querySelector('.modal')
const form = document.querySelector('.form')

const todo_tasks = document.querySelector('.todo')
const inProgress_tasks = document.querySelector('.inProgress')
const completed_tasks = document.querySelector('.completed')

const tasks = document.querySelectorAll('.tasks')

openModalButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        console.log(e.target)
        formModal.classList.add('show')
    })
})


form.addEventListener('submit',(event) => {
    event.preventDefault()
    const formData = new FormData(form)
    
    const title = formData.get('title')
    const description = formData.get('description')
    const status = formData.get('status')

    console.log({title,description,status})

    const card = createCard({title,description})

    if(status.toLowerCase() == 'todo') {
        todo_tasks.appendChild(card)
        updateTasksCount(todo_tasks);
    }
    else if(status.toLowerCase() == 'inprogress') {
        inProgress_tasks.appendChild(card)
        updateTasksCount(inProgress_tasks);
    }
    else {
        completed_tasks.appendChild(card)
        updateTasksCount(completed_tasks);
    }
    
    form.reset()
    formModal.classList.remove('show')
})

function createCard({title,description}) {
    const card = document.createElement('div')
    const h4 = document.createElement('h4')
    const p = document.createElement('p')

    card.classList.add('card')
    card.dataset = 'todo'
    const id = 'card-' + Date.now()
    card.id = id 

    h4.textContent = title
    p.textContent = description

    card.draggable = true
    card.appendChild(h4)
    card.appendChild(p)

    card.addEventListener('dragstart',() => {
        draggedCard = card
    })
    return card
}


function updateTasksCount(node) {
    const count = node.children.length;
    const title = getTaskTitle(node);
    title.dataset.tasks = count;
}

function getTaskTitle(node) {
    return node.parentElement.querySelector('h3')
}
//Append the dragged card to the dragged column

document.addEventListener('DOMContentLoaded',() => {
    tasks.forEach((task) => {
        task.addEventListener('dragover',(e) => e.preventDefault())

        task.addEventListener('drop',(e) => {
            e.preventDefault()
            if(draggedCard) {
                const sourceNode = draggedCard.parentElement // to decrement the count where the card is moved 
                console.log({sourceNode})
                task.appendChild(draggedCard)

                updateTasksCount(task) // Updated the count for the dragged task
                updateTasksCount(sourceNode)
                draggedCard = null
            }
        })
    })
})