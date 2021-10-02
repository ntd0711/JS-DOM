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
  const editBtn = liElement.querySelector('button.edit');

  // btn status
  const currClassBtn = liElement.dataset.status === 'pending' ? 'btn-dark' : 'btn-success';
  const currTextBtn = liElement.dataset.status === 'pending' ? 'finish' : 'reset';
  finishBtn.classList.remove('btn-success', 'btn-dark');
  finishBtn.classList.add(currClassBtn);
  finishBtn.textContent = currTextBtn;

  // div status todo
  const divElementTodo = liElement.querySelector('div.todo');
  if (!divElementTodo) return;

  const currentStatus =
    liElement.dataset.status === 'completed' ? 'alert-success' : 'alert-secondary';
  divElementTodo.classList.add(currentStatus);

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

      divElementTodo.classList.remove('alert-secondary', 'alert-success');
      divElementTodo.classList.add(newClassStatus);
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

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      // need get item from local storage
      // as item data can be outdated
      const todoList = getTodoList();
      const latestItem = todoList.find((x) => x.id === item.id);
      if (!latestItem) return;

      populateTodoForm(latestItem);
    });
  }

  return liElement;
}

function populateTodoForm(item) {
  const todoForm = document.getElementById('todo-from-id');
  if (!todoForm) return;

  todoForm.dataset.id = item.id;

  const todoInput = document.querySelector('#todo-input');
  if (todoInput) todoInput.value = item.title;
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

  const todoForm = document.getElementById('todo-from-id');
  if (!todoForm) return;

  const todoInput = document.querySelector('#todo-input');
  if (!todoInput) return;

  const isEdit = !!todoForm.dataset.id;
  if (isEdit) {
    const todoList = getTodoList();
    const index = todoList.findIndex((x) => x.id.toString() === todoForm.dataset.id);
    if (index < 0) return;

    todoList[index].title = todoInput.value;
    localStorage.setItem('todo_list', JSON.stringify(todoList));

    //update UI
    const liElement = document.querySelector(`ul#todoList>li[data-id='${todoForm.dataset.id}'`);
    if (liElement) {
      const titleElement = liElement.querySelector('.todo__title');
      if (titleElement) titleElement.textContent = todoInput.value;
    }
  } else {
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
  }

  // reset Form
  delete todoForm.dataset.id;
  todoForm.reset();
  // get input value

  // todoInput.value = '';
}

const handleCheck = (e) => {
  const status = e.target.checked ? 'completed' : 'pending';

  const todoList = getTodoList();
  if (!todoList) return;

  todoList.forEach((item) => (item.status = status));
  localStorage.setItem('todo_list', JSON.stringify(todoList));

  const newTodoList = getTodoList();

  newTodoList.forEach((item) => {
    const liElement = document.querySelector(`ul#todoList>li[data-id="${item.id}"`);
    if (!liElement) return;

    const divElementTodo = liElement.querySelector('div.todo');
    const finishBtn = liElement.querySelector('button.mark-as-done');

    liElement.dataset.status = item.status;

    const currStatus = liElement.dataset.status;
    const currClassDiv = currStatus === 'completed' ? 'alert-success' : 'alert-secondary';
    const currClassBtn = currStatus === 'pending' ? 'btn-dark' : 'btn-success';
    const currTextBtn = currStatus === 'pending' ? 'finish' : 'reset';

    divElementTodo.classList.remove('alert-success', 'alert-secondary');
    divElementTodo.classList.add(currClassDiv);

    finishBtn.classList.remove('btn-dark', 'btn-success');
    finishBtn.classList.add(currClassBtn);

    finishBtn.textContent = currTextBtn;
  });
};

(function () {
  const clubs = getTodoList();

  renderTodoList('todoList', clubs);

  const todoForm = document.getElementById('todo-from-id');
  if (!todoForm) return;

  todoForm.addEventListener('submit', handleSubmit);

  const inputCheck = document.querySelector('input[type="checkbox"]');
  if (!inputCheck) return;

  inputCheck.addEventListener('change', handleCheck);
})();
