const btn = document.getElementById("add-btn")
const input = document.getElementById("todo-input")
const list = document.getElementById("list")
const completedList = document.getElementById("completed-list")

const todo = {}



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
    //the basic functionality to add tasks
    const value = input.value

    if (value === "") return

    const item = document.createElement('li')
    item.innerText = value

    list.append(item)
    input.value = "" //clears input



    //delete functionality
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "delete"
    item.append(deleteBtn)

    deleteBtn.addEventListener("click", () => {item.remove()})



    //complete functionaility
    const completeBtn = document.createElement("button")
    completeBtn.innerText = "complete"
    item.append(completeBtn)

    completeBtn.addEventListener("click", () => 
        {
            completedList.append(item)
            completeBtn.remove()
        })

}