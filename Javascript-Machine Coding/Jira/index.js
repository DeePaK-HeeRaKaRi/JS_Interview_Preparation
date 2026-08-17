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

const types = {
    TODO: 'todo',
    INPROGRESS: 'inProgress',
    COMPLETED: 'completed'
}

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
    const id = Date.now()
    console.log({title,description,status})

    const card = createCard({id,title,description,status})

    const details = {
        id,
        title,
        description,
        status
    }
    if(status.toLowerCase() == types.TODO) {
        todo_tasks.appendChild(card)
        updateTasksCount(todo_tasks);
        updateLocalStorage(types.TODO, details)
    }
    else if(status.toLowerCase() == types.INPROGRESS) {
        inProgress_tasks.appendChild(card)
        updateTasksCount(inProgress_tasks);
        updateLocalStorage(types.INPROGRESS, details)
    }
    else {
        completed_tasks.appendChild(card)
        updateTasksCount(completed_tasks);
        updateLocalStorage(types.COMPLETED, details)
    }
    
    form.reset()
    formModal.classList.remove('show')
})

function createCard({ id, title, description, status }) {
    const card = document.createElement('div');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');

    card.classList.add('card');

    card.id = `card-${id}`;
    card.dataset.status = status;

    h4.textContent = title;
    p.textContent = description;

    card.draggable = true;

    card.appendChild(h4);
    card.appendChild(p);

    card.addEventListener('dragstart', () => {
        draggedCard = card;
    });

    return card;
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
                updateLocalStorage()
                draggedCard = null
            }
        })
    })
})

/* this approach fails and will mes up in the interview
function updateLocalStorage(type,details) {
   const storage = localStorage.getItem("jiraTasks");

   console.log({type,details})
    let data;

    if (!storage) {
        data = {
            allTasks: {
                todo: [],
                inProgress: [],
                completed: []
            }
        };
    } else {
        data = JSON.parse(storage);
    }

    data.allTasks[type].push(details);

    localStorage.setItem("jiraTasks", JSON.stringify(data));
}
*/

// Directly read from the dom
function updateLocalStorage() {
    const allTasks = {};

    tasks.forEach((taskList) => {
        const id = taskList.id;

        allTasks[id] = [];

        taskList.querySelectorAll('.card').forEach((card) => {
            allTasks[id].push({
                id: card.id.replace('card-', ''),
                title: card.querySelector('h4').textContent,
                description: card.querySelector('p').textContent
            });
        });
    });

    localStorage.setItem(
        'jiraTasks',
        JSON.stringify(allTasks)
    );
}

function loadTasksFromStorage() {
    const storage = localStorage.getItem('jiraTasks');

    if (!storage) {
        return;
    }

    const allTasks = JSON.parse(storage);

    Object.entries(allTasks).forEach(([status, taskList]) => {
        const node = document.querySelector(`.${status}`);

        if (!node) {
            return;
        }

        taskList.forEach((task) => {
            const card = createCard({
                id: task.id,
                title: task.title,
                description: task.description,
                status
            });

            node.appendChild(card);
        });

        updateTasksCount(node);
    });
}

loadTasksFromStorage();
/*
Localstorage 

jira : {
    todo: [{}],
    inProgress: [{}],
    completed: [{}]
}

--------------------------------

// To update or delete in o(1)
jira: {
    todo: {
        id1:{},
        id2:{},
        id3:{}
    },
    inProgress: {
        id1:{},
        id2:{},
        id3:{}
    },
    completed: {
        id1:{},
        id2:{},
        id3:{}
    },
}

But the above approach will fail for ordering, so usethe normalize

----------------------------------------------------------------

Entities

tasksById
  task-1 → {...}
  task-2 → {...}
  task-3 → {...}

from column ordering

columns
  todo → [task-1, task-3]
  inProgress → [task-2]
  completed → []
---------------------------------------------------------
But in interviews implement the option 1, as it is eaiser to implement due to time constraint
*/