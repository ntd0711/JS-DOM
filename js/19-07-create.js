function createElement(item) {
  if (!item) return null;

  const liElement = document.createElement("li");
  liElement.innerText = item.title;
  liElement.dataset.id = item.id;

  return liElement;
}

function renderTodoList(ElementId, todoList) {
  if (!Array.isArray(todoList) || todoList.length === 0) return;

  const ulElement = document.getElementById(ElementId);
  if (!ulElement) return;

  todoList.forEach((item) => {
    const liElement = createElement(item);

    ulElement.appendChild(liElement);
  });
}

(() => {
  const courses = [
    { id: 1, title: "javascript" },
    { id: 2, title: "ReactJS" },
    { id: 3, title: "NextJS" },
  ];

  const clubs = [
    { id: 1, title: "Liverpool" },
    { id: 1, title: "Chelsea" },
    { id: 1, title: "ManCity" },
  ];

  renderTodoList("todo-list2", clubs);
  renderTodoList("todo-list1", courses);
})();
