const API_URL = 'http://localhost:3000/api/tasks';

document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const message = document.getElementById('message').value;

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, message })
    });

    const task = await response.json();
    appendTask(task);

    document.getElementById('title').value = '';
    document.getElementById('message').value = '';
});

async function loadTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    tasks.forEach(appendTask);
}

function appendTask(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>${task.title}</strong>
        <p>${task.message}</p>
        <button onclick="deleteTask('${task._id}')">Deletar</button>
    `;
    document.getElementById('tasksList').appendChild(li);
}

async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    document.location.reload();
}

loadTasks();
