const btn = document.getElementById("add-btn")
const input = document.getElementById("todo-input")
const list = document.getElementById("list")
const completedList = document.getElementById("completed-list")

let nextID = 1
let storage = []

loadTodos()

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

    if (input.value === "") return //input validation

     //the basic functionality to add tasks
    todo.text = input.value
    todo.ID = nextID++
    todo.priority = 1
    todo.done = false

    renderTodo(todo)

    storage.push(todo)

    saveTodo()

    input.value = "" //clears input
   
}

function renderTodo(todo) //worries about dom
{    
    //populating list element
    todo.element = document.createElement('li')
    todo.element.innerText = todo.text

    //adding element to list
    list.append(todo.element)

    //delete functionality
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "delete"
    todo.element.append(deleteBtn)

    deleteBtn.addEventListener("click", () => {todo.element.remove(); deleteTodo(todo)})


    //complete functionaility
    const completeBtn = document.createElement("button")
    completeBtn.innerText = "complete"
    todo.element.append(completeBtn)

    completeBtn.addEventListener("click", () => 
        {
            completedList.append(todo.element)
            completeBtn.remove()

            todo.done = true
            saveTodo()
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
        saveTodo()
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

function saveTodo()
{
    console.log("here i am")

    localStorage.setItem("todos", JSON.stringify(storage))
}

function deleteTodo(todo)
{
    storage = storage.filter(t => t.ID != todo.ID)
    saveTodo()
}

function loadTodos()
{
    const saved = JSON.parse(localStorage.getItem("todos"))

    if(saved)
    {
        saved.forEach(todo => { renderTodo(todo)});
    }
}