'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');


let todoData = [];

const render = function(){
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item, i){
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.dataset.index = i;

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
    '<div class="todo-buttons">' + 
    '<button class="todo-remove"></button>' + 
    '<button class="todo-complete"></button>' + 
    '</div>';

    if (item.completed) {
      todoCompleted.append(li);
      item.completed = true;
    } else {
      todoList.append(li);
      item.completed = false;
    }

    const deleteButton = li.querySelector('.todo-remove');
    deleteButton .addEventListener('click', function (event) {
      const index = event.target.closest('li').dataset.index;
      todoData.splice(index, 1);
      localStorage.setItem('data', JSON.stringify(todoData));
      render();
    });

    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function(){
      item.completed = !item.completed;
      localStorage.setItem('data', JSON.stringify(todoData));
      render();
    });
  });
};

todoData = JSON.parse(localStorage.getItem('data')) || [];
render();

todoControl.addEventListener('submit', function(event){
   event.preventDefault();
  

  if (headerInput.value !== '') {
    
     const newTodo = {
    value: headerInput.value,
    completed: false
  };

  todoData.push(newTodo);
  localStorage.setItem('data', JSON.stringify(todoData));
  headerInput.value = '';
  render();
  }

  });




