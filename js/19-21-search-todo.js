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

function debounceSearch(callback, wait) {
  let timeoutId;

  return function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(callback, wait);
  };
}
function log() {
  console.log('ahihi');
}
function inputTypingTerm() {
  const inputElement = document.getElementById('search-term');
  if (!inputElement) return;

  inputElement.addEventListener('input', () => {
    // debounceSearch(() => searchTodo(inputElement.value), 1000)();
    searchTodo(inputElement.value);
  });
}

(() => {
  inputTypingTerm();
})();
