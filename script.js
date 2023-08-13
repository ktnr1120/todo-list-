const taskInput = document.getElementById('task');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// 保存されたタスクを取得
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 保存されたタスクを表示
savedTasks.forEach(savedTask => {
  createTaskElement(savedTask.text, savedTask.completed);
});

taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

addTaskButton.addEventListener('click', addTask);

function addTask() {
  const taskText = taskInput.value;
  if (taskText.trim() !== '') {
    createTaskElement(taskText, false);

    // タスクを保存
    savedTasks.push({ text: taskText, completed: false });
    updateLocalStorage();

    taskInput.value = '';
  }
}

function createTaskElement(text, completed) {
  const taskItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  taskItem.appendChild(checkbox);

  const taskLabel = document.createElement('label');
  taskLabel.textContent = text;
  taskItem.appendChild(taskLabel);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = '削除';
  deleteButton.className = 'delete-button';
  taskItem.appendChild(deleteButton);

  taskList.appendChild(taskItem);
}

taskList.addEventListener('click', (event) => {
  const clickedItem = event.target;

  if (clickedItem.classList.contains('delete-button')) {
    const listItem = clickedItem.parentElement;
    taskList.removeChild(listItem);

    // タスクを削除
    const taskIndex = Array.from(taskList.children).indexOf(listItem);
    savedTasks.splice(taskIndex, 1);
    updateLocalStorage();
  } else if (clickedItem.tagName === 'INPUT' && clickedItem.type === 'checkbox') {
    const listItem = clickedItem.parentElement;
    listItem.classList.toggle('completed');

    // タスクの完了状態を更新
    const taskIndex = Array.from(taskList.children).indexOf(listItem);
    savedTasks[taskIndex].completed = clickedItem.checked;
    updateLocalStorage();
  }
});

function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(savedTasks));
}