function createElement(item) {
  //   find template
  const liTemplate =
    document.getElementById("todoTemplate").content.firstElementChild;
  if (!liTemplate) return;

  // clone li element
  const liElement = liTemplate.cloneNode(true);
  liElement.dataset.id = item.id;

  // update content where needed
  const titleElement = liElement.querySelector(".todo__title");
  if (!titleElement) return;
  titleElement.textContent = item.title;

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

(function () {
  const clubs = [
    { id: 1, title: "Liverpool" },
    { id: 2, title: "Chelsea" },
    { id: 3, title: "ManCity" },
    { id: 4, title: "ManUtd" },
    { id: 5, title: "WestHam" },
    { id: 6, title: "Leicester" },
  ];

  renderTodoList("todoList", clubs);
})();
