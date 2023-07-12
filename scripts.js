// get elemetns 

const todoInput = document.getElementById("todoInput")
const addButton = document.getElementById("addButton")
const todoList = document.getElementById("todoList")


//make element with addtodo
{/* <div class="todo">
<input type="checkbox" /><span>Walk a Dog</span><span>Delete</span>
</div> */}

const removeTodo = (e)=>{
 e.target.parentNode.remove()
}
const checkBox = (e)=>{
    const todoTitle = e.target.nextSibling
    if (todoTitle.classList.contains('crossed')){
       todoTitle.classList.remove('crossed')
    }
    else {
        todoTitle.classList.add('crossed')
    }
}
const addTodo = (title)=>{
    if (title==='') return;
    const todoDiv = document.createElement('div')
    todoDiv.className='todo'
    const checkbox = document.createElement('input')
    checkbox.setAttribute("type",'checkbox')
    checkbox.addEventListener('change',(e)=>{
     checkBox(e)
    })
    todoDiv.append(checkbox)
    const span = document.createElement('span')
    span.textContent= title
    todoDiv.append(span)
    const span2 = document.createElement('span')
    span2.innerText= "🗑️"
    span2.addEventListener('click',removeTodo)
    todoDiv.append(span2)

    todoList.append(todoDiv)
    todoInput.value=''

} 

// add trigger 
addButton.addEventListener('click',()=>{addTodo(todoInput.value)})

