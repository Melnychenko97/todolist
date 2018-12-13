const form = document.querySelector('.form');
const input = document.querySelector('.input');
const ul = document.querySelector('ul');
let taskArray = [];
let taskId = 0; // set the current id for a task

class NewTask {

	constructor(info, state) {
		this.info = info;
		this.state = !!state;
		this.button
		this.checkbox
	}

	get ableDeleteButton() {

		this.button.addEventListener('click', () => {

			const currentJsonArray = localStorage.getItem('toDoList');
			const currentToDoList = JSON.parse(currentJsonArray);

			const listItem = this.button.parentElement;
			const listItemKey = +listItem.dataset.key;

			taskArray = taskArray.filter(item => item.id !== listItemKey); // to prevent adding of deleted elements
			const newToDoList = currentToDoList.filter(item =>  item.id !== listItemKey);//changes current info in a local storage 
			localStorage.setItem('toDoList', JSON.stringify(newToDoList));
			
			listItem.remove();
		});

	}

	get ableChecking() {  // updates info in local storage 

		this.checkbox.addEventListener('click', () => { 

			const listItem = this.checkbox.parentElement;
			const listItemKey = +listItem.dataset.key;
			const currentJsonArray = localStorage.getItem('toDoList');
			const currentToDoList = JSON.parse(currentJsonArray);
			const checkedState = currentToDoList[listItemKey];

			(checkedState.isChecked) ? checkedState.isChecked = false : checkedState.isChecked = true;

			this.checkbox.nextElementSibling.classList.toggle('crossed-out'); // markes completes tasks
			localStorage.setItem('toDoList', JSON.stringify(currentToDoList));
		});
	}

	get createListItem() {

		const listItem = document.createElement('li');
		listItem.classList.add('task-item');
		listItem.setAttribute(`data-key`, `${taskId}`); // add a dataset key

		const checkbox = document.createElement('input');
		checkbox.setAttribute('type', 'checkbox');
		this.checkbox = checkbox;

		const taskContent = document.createElement('p');
		taskContent.classList.add('task-content');

		if(this.state) {
			checkbox.setAttribute('checked', '');
			taskContent.classList.add('crossed-out');
		}

		const taskDeleteButton = document.createElement('button');
		taskDeleteButton.classList.add('task-delete');
		taskDeleteButton.innerText ='X';
		this.button = taskDeleteButton; 

		listItem.appendChild(checkbox);
		listItem.appendChild(taskContent);
		listItem.appendChild(taskDeleteButton);

		taskContent.innerText = this.info;

		return listItem;
	}

	get taskInfo () {
		return ({ // adding new info to Local Storage Array
		id : taskId++,
		task : this.info,
		isChecked: this.state
		});
	}
}

class NewUl {
	constructor(info, state) {
		this.info = info;
		this.state = !!state;
	}

	get createUL () {
		console.log(this.info + " " + this.state);
	const task = new NewTask(this.info, this.state);
	const listItem = task.createListItem;
	task.ableDeleteButton;
	task.ableChecking;

	ul.appendChild( listItem );
	
	taskArray.push(task.taskInfo);
	localStorage.setItem('toDoList', JSON.stringify(taskArray));
	}
}
	
form.addEventListener('submit', function(event) { // pushes new task in the list

	event.preventDefault();
	const text = input.value
	if(text) {
		const unorderedList = new NewUl(text);
		unorderedList.createUL;

		input.value = '';
	}
});

if (localStorage.length > 0) {  // if a local storage has smth, then parse toDoList 

	const toDoList = JSON.parse( localStorage.getItem('toDoList') );

	toDoList.forEach(item => {
		const text = item.task;
		const currentState = item.isChecked;

		const currentUnorderedList = new NewUl(text, currentState);
		currentUnorderedList.createUL;
	});
}