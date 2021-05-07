//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//Functions
function addTodo(event) {
	// prevent form from submitting
	event.preventDefault();
	//Todo DIV
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	// Creat LI
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
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
	// clear todoInput.value
	todoInput.value = "";
}

function deleteCheck(event) {
	const item = event.target;
	//DELETE TODO
	console.log(item);
	if (item.classList[0] === "trash-btn") {
		const todo = item.parentElement;
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
