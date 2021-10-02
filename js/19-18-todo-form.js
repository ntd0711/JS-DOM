function createElement(item) {
  //   find template
  const liTemplate = document.getElementById('todoTemplate').content.firstElementChild;
  if (!liTemplate) return;

  // clone li element
  const liElement = liTemplate.cloneNode(true);
  liElement.dataset.id = item.id;
  liElement.dataset.status = item.status;

  // get button
  if (!liElement) return;
  const finishBtn = liElement.querySelector('button.mark-as-done');
  const removeBtn = liElement.querySelector('button.remove');

  // btn status
  const newClassBtn = liElement.dataset.status === 'pending' ? 'btn-dark' : 'btn-success';
  const currTextBtn = liElement.dataset.status === 'pending' ? 'finish' : 'reset';
  finishBtn.classList.remove('btn-success', 'btn-dark');
  finishBtn.classList.add(newClassBtn);
  finishBtn.textContent = currTextBtn;

  // div status todo
  const divStatusTodo = liElement.querySelector('div.todo');
  if (!divStatusTodo) return;

  const currentStatus = item.status === 'completed' ? 'alert-success' : 'alert-secondary';
  divStatusTodo.classList.add(currentStatus);

  // update content where needed
  const titleElement = liElement.querySelector('.todo__title');
  if (!titleElement) return;
  titleElement.textContent = item.title;

  // attach event
  if (finishBtn) {
    finishBtn.addEventListener('click', () => {
      const currentStatus = liElement.dataset.status;

      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';

      const newTextBtn = currentStatus === 'pending' ? 'reset' : 'finish';
      const newClassBtn = currentStatus === 'pending' ? 'btn-success' : 'btn-dark';

      const newClassStatus = currentStatus === 'pending' ? 'alert-success' : 'alert-secondary';

      const todoList = getTodoList();
      const index = todoList.findIndex((todo) => todo.id === item.id);
      todoList[index].status = newStatus;

      localStorage.setItem('todo_list', JSON.stringify(todoList));

      finishBtn.textContent = newTextBtn;
      finishBtn.classList.remove('btn-success', 'btn-dark');
      finishBtn.classList.add(newClassBtn);

      liElement.dataset.status = newStatus;

      divStatusTodo.classList.remove('alert-secondary', 'alert-success');
      divStatusTodo.classList.add(newClassStatus);
    });
  }

  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      const todoList = getTodoList();

      const newTodoList = todoList.filter((x) => x.id !== item.id);
      localStorage.setItem('todo_list', JSON.stringify(newTodoList));

      liElement.remove();
    });
  }

  return liElement;
}

function renderTodoList(elementId, listSth) {
  const todoListElement = document.getElementById(elementId);
  if (!todoListElement) return;

  listSth.forEach((item) => {
    const todoElement = createElement(item);

    todoListElement.appendChild(todoElement);
  });
}

function getTodoList() {
  try {
    return JSON.parse(localStorage.getItem('todo_list')) || [];
  } catch {
    return [];
  }
}

function handleSubmit(e) {
  e.preventDefault();

  // get input value
  const todoInput = e.target.querySelector('#todo-input');
  if (!todoInput) return;

  const newTodo = {
    id: Date.now(),
    title: todoInput.value,
    status: 'pending',
  };
  // save localStorage

  const todoList = getTodoList();
  todoList.push(newTodo);
  localStorage.setItem('todo_list', JSON.stringify(todoList));
  // render UI

  const todoElement = createElement(newTodo);
  const todoListElement = document.getElementById('todoList');
  if (!todoListElement) return;

  todoListElement.appendChild(todoElement);

  // reset Form
  // todoInput.value = '';
  const todoForm = document.getElementById('todo-from-id');
  todoForm.reset();
}

(function () {
  // const clubs = [
  //   { id: 1, title: 'Liverpool', status: 'pending' },
  //   { id: 2, title: 'Chelsea', status: 'pending' },
  //   { id: 3, title: 'ManCity', status: 'pending' },
  //   { id: 4, title: 'ManUtd', status: 'pending' },
  //   { id: 5, title: 'WestHam', status: 'pending' },
  //   { id: 6, title: 'Leicester', status: 'pending' },
  // ];
  const clubs = getTodoList();

  renderTodoList('todoList', clubs);

  const todoForm = document.getElementById('todo-from-id');
  if (!todoForm) return;

  todoForm.addEventListener('submit', handleSubmit);
})();
