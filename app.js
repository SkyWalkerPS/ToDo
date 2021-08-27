const addButton = document.querySelector('.add-button');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');


let todos = [];//contains objects having {id, name, completed} vars.


//Add button
addButton.addEventListener('click', function(){
    addTodo(todoInput.value);
});

function addTodo(item){
    if(item !== ''){
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos);

        todoInput.value = '';
    }
}

//To update what's going on
function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
      
      todos = JSON.parse(reference);
      renderTodos(todos);
    }
}
getFromLocalStorage();


//Add to local storage
function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}
//show on screen what's been done
function renderTodos(todos){
    todoItemsList.innerHTML = "";

    todos.forEach(function(item){
        const checked = item.completed ? 'checked' : null;

        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        li.classList.add('todo_item');

        if(item.completed === true){
            li.classList.add('checked');
        }

        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>
        `;
        todoItemsList.append(li);
    })
}


//checkbox data save to local
todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
      toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-button')) {
      deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});
function toggle(id) {
    todos.forEach(function(item) {
      if (item.id == id) {
        item.completed = !item.completed;
      }
    });
    addToLocalStorage(todos);
}
//delete button
function deleteTodo(id) {
    todos = todos.filter(function(item) {
      return item.id != id;
    });
    addToLocalStorage(todos);
}

