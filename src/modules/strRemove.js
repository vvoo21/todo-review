import setIds from './setIds.js';

const strRemove = {
  todo(id) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const newToDos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(newToDos));
    setIds();
  },

  allCompleted() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const newToDos = todos.filter((todo) => todo.done === false);
    localStorage.setItem('todos', JSON.stringify(newToDos));
    setIds();
  },
};

export default strRemove;