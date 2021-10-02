function getAllTodoElement() {
  return document.querySelectorAll('ul#todoList > li');
}

function initSearchInput(params) {
  const inputElement = document.getElementById('search-term');
  if (!inputElement) return;

  if (params) {
    inputElement.value = params;
  }

  inputElement.addEventListener('input', () => {
    handleFilterChange('searchTerm', inputElement.value);
  });
}

function initFilterStatus(params) {
  const selectedElement = document.getElementById('status-filter');
  if (!selectedElement) return;

  if (params) {
    selectedElement.value = params;
  }

  selectedElement.addEventListener('change', () => {
    handleFilterChange('status', selectedElement.value);
  });
}

function isMatchSearch(todoElement, searchTerm) {
  if (!todoElement) return false;

  if (searchTerm === null || searchTerm === '') return true;

  const titleElement = todoElement.querySelector('p.todo__title');
  if (!titleElement) return false;

  return titleElement.textContent.toLowerCase().includes(searchTerm?.toLowerCase());
}

function isMatchStatus(todoElement, filterStatus) {
  if (filterStatus === null) return true;
  return filterStatus === 'all' || todoElement.dataset.status === filterStatus;
}

function isMatch(todoElement, params) {
  return (
    isMatchSearch(todoElement, params.get('searchTerm')) &&
    isMatchStatus(todoElement, params.get('status'))
  );
}

function handleFilterChange(filterName, filterValue) {
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);
  history.pushState({}, '', url);

  const todoElementList = getAllTodoElement();

  for (const todoElement of todoElementList) {
    const needToShow = isMatch(todoElement, url.searchParams);
    todoElement.hidden = !needToShow;
  }
}

(() => {
  const params = new URLSearchParams(window.location.search);

  const todoElementList = getAllTodoElement();

  for (const todoElement of todoElementList) {
    const needToShow = isMatch(todoElement, params);
    todoElement.hidden = !needToShow;
  }

  initSearchInput(params.get('searchTerm'));
  initFilterStatus(params.get('status'));
})();
