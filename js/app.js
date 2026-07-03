const btn = document.getElementById("add-btn")
const input = document.getElementById("todo-input")
const list = document.getElementById("list")


btn.addEventListener('click', () => addTodo())



function addTodo()
{    
    const value = input.value

    if (value == "") return

    const item = document.createElement('li')
    item.innerText = value

    const deleteBtn = document.createElement("button")
    item.append(deleteBtn)

    deleteBtn.addEventListener("click", () => {item.remove()})

    list.append(item)
    input.value = ""
}