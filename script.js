const form = document.getElementById('task-form');
const tasksList = document.getElementById('tasks-list');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Функция отображения задач
function renderTasks(filter = 'all') {
  tasksList.innerHTML = '';
  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.stack === filter);

  filtered.forEach((task, index) => {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.innerHTML = `
      <h3>${task.title} (${task.stack})</h3>
      <p>${task.description}</p>
      <button class="delete-btn">Удалить</button>
    `;

    taskCard.querySelector('.delete-btn').addEventListener('click', () => {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks(filter);
    });

    tasksList.appendChild(taskCard);
  });
}

// Функция добавления задачи
function addTask() {
  const title = form.title.value.trim();
  const stack = form.stack.value;
  const description = form.description.value.trim();
  if (!title || !stack) return;

  const task = { title, stack, description };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  form.reset();
  renderTasks();
}

// События
form.addEventListener('submit', e => {
  e.preventDefault();
  addTask();
});

// Enter в input создаёт задачу
form.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
    addTask();
  }
});

// Фильтрация
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    renderTasks(btn.dataset.filter);
  });
});

// Изначальная отрисовка
renderTasks();
