//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
	// prevent form from submitting
	event.preventDefault();
	// Todo DIV
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	// Creat LI
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	saveLocalTodos(todoInput.value);
	// CHACK MARK BUTTON
	const completedButton = document.createElement("Button");
	completedButton.innerHTML = '<i class="fas fa-check"></li>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
	// trash Button
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></li>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	// APPEND TO LIST
	todoList.append(todoDiv);
	// clear todoInput.value
	todoInput.value = "";
}

function deleteCheck(event) {
	const item = event.target;
	//DELETE TODO
	if (item.classList[0] === "trash-btn") {
		const todo = item.parentElement;
		//DELETE TODO from local storage
		deleteLocalTodo(todo);
		// add transition fall animation
		todo.classList.add("fall");
		//? why we can use setTimeout in this situation
		// setTimeout(todo.remove(), 1.0 * 5000);
		todo.addEventListener("transitionend", () => {
			todo.remove();
		});
	}

	//CHECK MARK
	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("completed");
	}
}

function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach((todo) => {
		switch (e.target.value) {
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if (todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "uncompleted":
				if (!todo.classList.contains("completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
		}
	});
}

function saveLocalTodos(todo) {
	//CHECK Todo existience
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}

	todos.forEach((todo) => {
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		// Creat LI
		const newTodo = document.createElement("li");
		newTodo.innerText = todo;
		newTodo.classList.add("todo-item");
		todoDiv.appendChild(newTodo);
		// CHACK MARK BUTTON
		const completedButton = document.createElement("Button");
		completedButton.innerHTML = '<i class="fas fa-check"></li>';
		completedButton.classList.add("complete-btn");
		todoDiv.appendChild(completedButton);
		// trash Button
		const trashButton = document.createElement("button");
		trashButton.innerHTML = '<i class="fas fa-trash"></li>';
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);
		// APPEND TO LIST
		todoList.append(todoDiv);
	});
}

function deleteLocalTodo(todo) {
	//DELETE ToDo from local storage
	// #1 get local todos from local storege and sace it in an array.
	let localTodos = JSON.parse(localStorage.getItem("todos"));
	// #2 get todo from the todo container on the dom
	const todos = [...todoList.childNodes];
	// locate todo on the dom and delete it from local storage
	localTodos.splice(todos.indexOf(todo), 1);
	localStorage.setItem("todos", JSON.stringify(localTodos));
}
