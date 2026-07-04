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

    if (todo.text === "") return

    todo.element = document.createElement('li')
    todo.element.innerText = todo.text

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

}