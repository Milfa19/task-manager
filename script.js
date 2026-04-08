const form = document.getElementById('task-form');
const tasksList = document.getElementById('tasks-list');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Рендерим задачи
function renderTasks(filter = "All") {
  tasksList.innerHTML = '';
  const filteredTasks = filter === "All" ? tasks : tasks.filter(t => t.stack === filter);
  filteredTasks.forEach((task, index) => {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.innerHTML = `
      <h3>${task.title}</h3>
      <p><strong>Стек:</strong> ${task.stack}</p>
      <p>${task.desc}</p>
      <button class="delete-btn" data-index="${index}">Удалить</button>
    `;
    tasksList.appendChild(card);
  });
}

// Добавление задачи
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = {
    title: document.getElementById('task-title').value,
    stack: document.getElementById('task-stack').value,
    desc: document.getElementById('task-desc').value
  };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  form.reset();
});

// Удаление задачи
tasksList.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
});

// Фильтрация
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    renderTasks(btn.dataset.filter);
  });
});

// Инициализация
renderTasks();