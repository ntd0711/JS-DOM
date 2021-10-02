function isMatch(todoElement, params) {
  const { status, searchTerm } = params;

  if ((status === 'all' || status === null) && searchTerm === null) return true;

  const titleTodo = todoElement.querySelector('.todo__title');
  if (!titleTodo) return false;

  const isMatchTitle =
    searchTerm === null || titleTodo.textContent.toLowerCase().includes(searchTerm?.toLowerCase());
  const isMatchStatus =
    status === null || status === 'all' || todoElement.dataset.status === status;

  return isMatchTitle && isMatchStatus;
}

function getAllTodoElement() {
  return document.querySelectorAll('ul#todoList > li');
}

function findTodo(todoElement, params) {
  if (!(params || todoElement)) return;

  const needToShow = isMatch(todoElement, params);

  todoElement.hidden = !needToShow;
}

function initSearchInput() {
  const inputElement = document.getElementById('search-term');
  if (!inputElement) return;

  inputElement.addEventListener('change', () => {
    const newUrl = addQueryParams('searchTerm', inputElement.value);
    location.assign(newUrl);
  });
}

function initFilterStatus() {
  const selectedElement = document.getElementById('status-filter');
  if (!selectedElement) return;

  selectedElement.addEventListener('change', () => {
    const newUrl = addQueryParams('status', selectedElement.value);
    location.assign(newUrl);
  });
}

function setDefaultOption(selectedValue) {
  const selectedElement = document.getElementById('status-filter');
  if (!selectedElement) return;

  Array.from(selectedElement.options).forEach((option, i) => {
    if (option.value === selectedValue) selectedElement.selectedIndex = i;
  });
}

function renderTodo() {
  const params = getParams();

  setDefaultOption(params.status);

  const todoElementList = getAllTodoElement();

  todoElementList.forEach((todoElement) => {
    findTodo(todoElement, params);
  });
}

(() => {
  renderTodo();
  initSearchInput();
  initFilterStatus();
})();

// function createUrl() {}

function addQueryParams(key, value) {
  if (!(key || value)) return;
  const url = new URL(location.href);

  const search_params = new URLSearchParams(url.search);
  search_params.set(key, value);

  url.search = search_params.toString();
  const new_url = url.toString();

  return new_url;
}

function getParams() {
  const params = new URLSearchParams(location.search);
  const status = params.get('status');
  const searchTerm = params.get('searchTerm');

  return { status, searchTerm };
}
