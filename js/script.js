let todos = [];
let isFilterActive = false;

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');

    if (todoInput.value.trim() === '' || todoDate.value === '') {
        alert('Please fill in the todo and date fields');
        return;
    }

    todos.push({ text: todoInput.value.trim(), date: todoDate.value });

    const emptyRow = document.getElementById('emptyRow');
    if (emptyRow) emptyRow.style.display = 'none';

    const tbody = document.getElementById('todoBody');
    const newRow = document.createElement('tr');
    newRow.classList.add('todoItem');
    newRow.innerHTML = `
        <td class="border p-4">${todoInput.value.trim()}</td>
        <td class="border p-4">${todoDate.value}</td>
        <td class="border p-4 text-center">
            <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-sm">Pending</span>
        </td>
        <td class="border p-4 text-center">
            <button class="bg-red-500 text-white px-3 py-1 rounded" onclick="deleteTodo(this)">Delete</button>
        </td>
    `;
    tbody.appendChild(newRow);

    todoInput.value = '';
    todoDate.value = '';
}

function deleteTodo(button) {
    const row = button.closest('tr');
    const todoText = row.cells[0].textContent.trim();
    todos = todos.filter(todo => todo.text !== todoText);
    row.remove();

    const remaining = document.querySelectorAll('#todoBody tr.todoItem');
    if (remaining.length === 0) {
        const emptyRow = document.getElementById('emptyRow');
        if (emptyRow) emptyRow.style.display = '';
    }
}

function deleteTodos() {
    todos = [];
    document.querySelectorAll('#todoBody tr.todoItem').forEach(row => row.remove());

    const emptyRow = document.getElementById('emptyRow');
    if (emptyRow) emptyRow.style.display = '';

    isFilterActive = false;
    document.getElementById('filterBtn').innerText = 'Filter Todos';
}

function filterTodos() {
    const rows = document.querySelectorAll('#todoBody tr.todoItem');
    const filterBtn = document.getElementById('filterBtn');
    isFilterActive = !isFilterActive;

    if (isFilterActive) {
        filterBtn.innerText = 'Filter: Hide All';
        rows.forEach(row => row.style.display = 'none');
    } else {
        filterBtn.innerText = 'Filter: All';
        rows.forEach(row => row.style.display = '');
    }
}