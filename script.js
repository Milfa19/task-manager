const form = document.getElementById('task-form');
const tasksList = document.getElementById('tasks-list');

// Функция добавления задачи
function addTask() {
  const title = form.title.value.trim();
  const stack = form.stack.value;
  const description = form.description.value.trim();

  if (!title || !stack) return;

  const taskCard = document.createElement('div');
  taskCard.className = 'task-card';
  taskCard.innerHTML = `
    <h3>${title} (${stack})</h3>
    <p>${description}</p>
    <button class="delete-btn">Удалить</button>
  `;

  // Удаление задачи
  taskCard.querySelector('.delete-btn').addEventListener('click', () => {
    taskCard.remove();
  });

  tasksList.appendChild(taskCard);

  form.reset();
}

// Создание задачи при клике на кнопку
form.addEventListener('submit', function(e) {
  e.preventDefault();
  addTask();
});

// Создание задачи при нажатии Enter (только для input, не textarea)
form.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
    addTask();
  }
});
