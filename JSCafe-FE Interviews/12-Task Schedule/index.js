// Task a is dependent on b and c like that
// task a is executed if b and c is executed
// task d is independent

// task d and task f is executed immediately
// if task d gets executed we can remove dependency d from task b
// if task f gets executed we can remove dependency f from task e
// than exeuted a

// order of execution d > f > b > e > c > a


const schedules1=[
    {"id":"a","dependencies":["b","c"]},
    {"id":"b","dependencies":["d"]},
    {"id":"c","dependencies":["e"]},
    {"id":"d","dependencies":[]},
    {"id":"e","dependencies":["f"]},
    {"id":"f","dependencies":[]},
]

const schedules = JSON.parse(JSON.stringify(schedules1))
const totalTasks=schedules.length
let totalTasksExecuted=0
let currentTask=0
const removeTasks=(id)=>{
    schedules.forEach((task) =>{
        const index=task.dependencies.indexOf(id)
        if(index!=-1) {
            task.dependencies.splice(index,1)
        }
    })
}
const executeTasks = () => {
    while(totalTasksExecuted < totalTasks){
        const task=schedules[currentTask]
        if(task.dependencies.length === 0 && !task.executed){
            console.log(task.id)
            removeTasks(task.id)
            task.executed=true
            totalTasksExecuted+=1 
        }else if(!task.visited){
            // console.log('-----------',task.visited)
            task.visited=1
        }else if(task.visited>totalTasks){
            console.log('looop found')
            break
        }
        else{
            task.visited+=1
        }
        console.log('----task',task)
        if(currentTask==totalTasks-1){
            currentTask=0
        }
        else{
            currentTask+=1
        }
        // console.log(task)
    }
}
executeTasks()

console.log('-----schedules',schedules)
console.log("-----schedules1", schedules1);