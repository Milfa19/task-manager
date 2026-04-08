const form = document.getElementById('task-form');
const tasksList = document.getElementById('tasks-list');

form.addEventListener('submit', function(e) {
  e.preventDefault();

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

  taskCard.querySelector('.delete-btn').addEventListener('click', () => {
    taskCard.remove();
  });

  tasksList.appendChild(taskCard);

  form.reset();
});
