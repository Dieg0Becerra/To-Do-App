import { firebaseApp, auth, googleAuth, fireSave} from "./firebase-config.js"
import { onAuthStateChanged, signInWithPopup, signOut} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js"
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js"


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
const loginBtn = document.getElementById("login-btn")
const logoutBtn = document.getElementById("logout-btn")

//setting up base case for functions and current user to pull from
let currentUser = null
let saveTodo = saveToLocal
let loadTodos = loadFromLocal


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



//listeners regarding auth
onAuthStateChanged(auth, (user) =>
{
   currentUser = user

   if(user)
   {
    let saveTodo = saveToFirebase
    let loadTodos = loadFromFirebase
   }

   else
    {
    let saveTodo = saveToLocal
    let loadTodos = loadFromLocal
    }

    loadTodos()
})

loginBtn.addEventListener('click', () => {signInWithPopup(auth, googleAuth)})
loginBtn.addEventListener('click', () => {signOut(auth)})


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
    
    if(filterTimeframe.checked === false) //controls if sorted by timeframe
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

function saveToLocal()
{
    console.log("here i am")

    localStorage.setItem("todos", JSON.stringify(storage))
}

function deleteTodo(todo)
{
    storage = storage.filter(t => t.ID != todo.ID)
    saveTodo()
}

function loadFromLocal()
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

function saveToFirebase()
{
    let cleanTodos = storage.map(todo => 
    {
        const { element, ...data} = todo
        return data
    }
    )

    setDoc(doc(fireSave, "users", currentUser.uid, "todos", "allTodos"), { todos: cleanTodos})
}

async function loadFromFirebase()
{
    const savedDoc = await getDoc(fireSave,  "users", currentUser.uid, "todos", "allTodos")

    if (savedDoc.exists())
    {
        const saved = savedDoc.data().todos
        storage = saved

        saved.forEach(todo => 
            {
                renderTodo(todo)

                if (todo.ID >= nextID) nextID = todo.ID + 1
            });
    }
    
    sortTodos()
}

