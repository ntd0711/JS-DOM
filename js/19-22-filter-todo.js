function isMatch(todoElement, searchTerm) {
  if (!todoElement) return false;

  if (searchTerm === '') return true;

  const titleTodo = todoElement.querySelector('.todo__title');
  if (!titleTodo) return false;

  return titleTodo.textContent.toLowerCase().includes(searchTerm.toLowerCase());
}

function getAllTodoElement() {
  return document.querySelectorAll('ul#todoList > li');
}

function searchTodo(searchTerm) {
  const todoElementList = getAllTodoElement();
  if (!todoElementList) return;

  todoElementList.forEach((todoElement) => {
    const isShow = isMatch(todoElement, searchTerm);

    todoElement.hidden = !isShow;
  });
}

function FilterStatusTodo(filterStatus) {
  if (!filterStatus) return;

  const todoElementList = getAllTodoElement();
  if (!todoElementList) return;

  todoElementList.forEach((todoElement) => {
    const isShow = filterStatus === 'all' || todoElement.dataset.status === filterStatus;

    todoElement.hidden = !isShow;
  });
}

function initSearchInput() {
  const inputElement = document.getElementById('search-term');
  if (!inputElement) return;

  inputElement.addEventListener('input', () => {
    searchTodo(inputElement.value);
  });
}

function initFilterStatus() {
  const selectedElement = document.getElementById('status-filter');
  if (!selectedElement) return;

  selectedElement.addEventListener('change', () => {
    FilterStatusTodo(selectedElement.value);
  });
}

(() => {
  initSearchInput();
  initFilterStatus();
})();
