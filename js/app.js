const btn = document.getElementById("popup-btn")
const input = document.getElementById("todo-input")
const list = document.getElementById("list")
const shortList = document.getElementById("short-list")
const longList = document.getElementById("long-list")
const completedList = document.getElementById("completed-list")

const addBtn = document.getElementById("add-btn")
const cancelBtn = document.getElementById("cancel-btn")
const dateInput = document.getElementById("due-date")
const popupWindow = document.getElementById("window")
const timeFrame = document.getElementById("time-frame")
const startingPriority = document.getElementById("priority")
const sortSelect = document.getElementById("sort-select")
const filterTimeframe = document.getElementById("filter-timeframe")

let nextID = 1
let storage = []

loadTodos()


btn.addEventListener('click', () => popWindow())
/*input.addEventListener('keypress', (e) =>
    {
        if (e.key === "Enter")
        {
            addTodo()
        }
    })*/

sortSelect.addEventListener("change", () => {sortTodos(); console.log("sorted")})
filterTimeframe.addEventListener("change", () => {sortTodos()})    

function popWindow()
{
    popupWindow.style.display = "block"

    cancelBtn.addEventListener("click", () => {popupWindow.style.display = "none"})

    addBtn.addEventListener("click", () =>
        {
            addTodo()
            popupWindow.style.display = "none"
        })
}


function addTodo()
{    
    const todo = {}

    if (input.value === "") return //input validation

     //the basic functionality to add tasks
    todo.text = input.value
    todo.ID = nextID++
    todo.priority = parseInt(startingPriority.value)
    todo.done = false
    todo.date = dateInput.value
    todo.time = timeFrame.value
    

    renderTodo(todo)

    storage.push(todo)

    saveTodo()

    sortTodos()

    input.value = "" //clears input
   
}

function renderTodo(todo) //worries about dom
{    
    //populating list element
    todo.element = document.createElement('li')
    todo.element.innerText = `${todo.text} | ${todo.time} | Due: ${todo.date}`

    //adding element to list
    
    if(filterTimeframe.checked === false)
    {
        list.append(todo.element)
    }

    else if(todo.time === "Short term")
    {
        shortList.append(todo.element)
    }

    else if(todo.time === "Long term")
    {
        longList.append(todo.element)
    }


    //delete functionality
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "delete"
    todo.element.append(deleteBtn)

    deleteBtn.addEventListener("click", () => {todo.element.remove(); deleteTodo(todo)})


    //complete functionality
    const completeBtn = document.createElement("button")
    completeBtn.innerText = "complete"
    todo.element.append(completeBtn)

    completeBtn.addEventListener("click", () => 
        {
            todo.done = true
            completedList.append(todo.element)
            completeBtn.remove()
            saveTodo()
        })

    if (todo.done === true) 
    {
        completedList.append(todo.element)
        completeBtn.remove()
        console.log("if completed")
    }


    //adding priority and buttons
    function updatePriority(change) //helper function
    {
        if(todo.priority + change > 5 || todo.priority + change < 1)
        {
            return
        }
        
        todo.priority += change
        docPriorityNum.innerText = todo.priority
        saveTodo()
    }
    
    const docPriorityNum = document.createElement("span")
    docPriorityNum.innerText = todo.priority
    
    const minusP = document.createElement("button")
    minusP.innerText = "-"
    todo.element.append(minusP)

    minusP.addEventListener("click", () => updatePriority(-1))
    
    todo.element.append(docPriorityNum)

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
        storage = saved
        saved.forEach(todo => 
            {
                renderTodo(todo)

                if (todo.ID >= nextID) nextID = todo.ID + 1
            });
    }

    sortTodos()
}

function sortTodos()
{
    list.innerHTML = ""
    completedList.innerHTML = ""
    shortList.innerHTML= ""
    longList.innerHTML = ""

    console.log(sortSelect.value)

    if (sortSelect.value === "sort-id")
    {
        storage.sort((a, b) => a.ID - b.ID)
        storage.forEach(todo => renderTodo(todo))
    }

    else if (sortSelect.value === "sort-priority")
    {
        storage.sort((a, b) => b.priority - a.priority)
        storage.forEach(todo => renderTodo(todo))
    }

    else if(sortSelect.value === "sort-date")
    {
        storage.sort((a, b) => new Date(a.date) - new Date(b.date))
        storage.forEach(todo => renderTodo(todo))
    }

}