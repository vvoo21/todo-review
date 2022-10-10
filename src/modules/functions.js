import strRemove from './strRemove.js';

export default function DisplayTodos() {
  const todoList = document.querySelector('#todo-list-wrap');
  const todos = JSON.parse(localStorage.getItem('todos')) || [];

  todoList.innerHTML = '';

  todos.forEach((todo) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item', todo.done ? 'done' : 'a');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const editBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    input.type = 'checkbox';
    input.checked = todo.done;

    span.classList.add('bubble');
    content.classList.add('todo-content');
    actions.classList.add('actions');
    editBtn.classList.add('edit');
    removeBtn.classList.add('remove');

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    editBtn.innerHTML = 'Edit';
    removeBtn.innerHTML = 'Delete';

    todoList.appendChild(todoItem);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(editBtn);
    actions.appendChild(removeBtn);

    input.addEventListener('change', () => {
      todo.done = !todo.done;
      localStorage.setItem('todos', JSON.stringify(todos));
      if (todo.done) {
        todoItem.classList.add('done');
      } else {
        todoItem.classList.remove('done');
      }
    });

    editBtn.addEventListener('click', () => {
      const inpunt = content.querySelector('input');
      inpunt.removeAttribute('readonly');
      inpunt.focus();
      inpunt.addEventListener('blur', (e) => {
        inpunt.setAttribute('readonly', true);
        todo.content = e.target.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();
      });
    });

    removeBtn.addEventListener('click', (e) => {
      strRemove.todo(todo.id);
      e.target.parentElement.parentElement.remove();
    });
  });
}

const clearBtn = document.querySelector('.clear-all');

clearBtn.addEventListener('click', () => {
  strRemove.allCompleted();
  DisplayTodos();
});
