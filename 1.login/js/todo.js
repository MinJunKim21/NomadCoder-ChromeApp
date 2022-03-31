const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEYS = "todos";

let toDos = [];

function saveToDos(){
   localStorage.setItem(TODOS_KEYS, JSON.stringify(toDos));
}

function deleteToDo(event){
   const li = event.target.parentElement;
   li.remove();
}
function paintToDo(newTodo) {
   const li = document.createElement("li");
   li.id =newTodo.id
   const span = document.createElement("span");
   span.innerText = newTodo.text;
   const button = document.createElement("button");
   button.innerText = "😆";
   button.addEventListener("click", deleteToDo);
   li.appendChild(span);
   li.appendChild(button);
   toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
   event.preventDefault();
   const newTodo = toDoInput.value;
   toDoInput.value = "";
   const newToDoObj = {
      text: newTodo,
      id: Date.now(),
   };
   toDos.push(newToDoObj);
   paintToDo(newToDoObj);
   saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEYS);

if(savedToDos !== null){
   const parsedToDos = JSON.parse(savedToDos);
   toDos = parsedToDos;
   parsedToDos.forEach(paintToDo);
}