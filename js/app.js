const btn = document.getElementById("add-btn")
const input = document.getElementById("todo-input")
const list = document.getElementById("list")
const completedList = document.getElementById("completed-list")

let nextID = 1


btn.addEventListener('click', () => addTodo())
input.addEventListener('keypress', (e) =>
    {
        if (e.key === "Enter")
        {
            addTodo()
        }
    })


function addTodo()
{    
    const todo = {}
    //the basic functionality to add tasks
    todo.text = input.value
    todo.ID = nextID++
    todo.priority = 1

    if (todo.text === "") return //input validation

    //populating list element
    todo.element = document.createElement('li')
    todo.element.innerText = todo.text

    //adding element to list
    list.append(todo.element)
    input.value = "" //clears input



    //delete functionality
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "delete"
    todo.element.append(deleteBtn)

    deleteBtn.addEventListener("click", () => {todo.element.remove()})



    //complete functionaility
    const completeBtn = document.createElement("button")
    completeBtn.innerText = "complete"
    todo.element.append(completeBtn)

    completeBtn.addEventListener("click", () => 
        {
            completedList.append(todo.element)
            completeBtn.remove()

            todo.done = true
        })


    //adding priority and buttons
    function updatePriority(change) //helper function
    {
        if(todo.priority + change > 5 || todo.priority + change < 1)
        {
            return
        }
        
        todo.priority += change
        priorityNum.innerText = todo.priority
        console.log('called with', change)

    }
    
    const priorityNum = document.createElement("span")
    priorityNum.innerText = todo.priority
    
    const minusP = document.createElement("button")
    minusP.innerText = "-"
    todo.element.append(minusP)

    minusP.addEventListener("click", () => updatePriority(-1))
    
    todo.element.append(priorityNum)

    const plusP = document.createElement("button")
    plusP.innerText = "+"
    todo.element.append(plusP)

    plusP.addEventListener("click", () => updatePriority(1))
    

}