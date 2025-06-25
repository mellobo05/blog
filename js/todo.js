// todo.js - TaskMaster Pro Todo Manager
class TodoManager {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.editingId = null;
        this.init();
    }

    init() {
        this.setTodayDate();
        document.getElementById('todoForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTodo();
        });
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.currentTarget.dataset.filter));
        });
        this.renderTodos();
    }

    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('todoDueDate').value = today;
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const priority = document.getElementById('todoPriority').value;
        const dueDate = document.getElementById('todoDueDate').value;
        const text = input.value.trim();
        if (!text) return this.showAlert('Please enter a task!', 'warning');
        const todo = {
            id: Date.now(),
            text,
            completed: false,
            priority,
            dueDate,
            createdAt: new Date().toISOString()
        };
        this.todos.unshift(todo);
        this.saveTodos();
        this.renderTodos();
        input.value = '';
        this.setTodayDate();
        this.showAlert('Task added successfully!', 'success');
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
        }
    }

    deleteTodo(id) {
        if (confirm('Delete this task?')) {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveTodos();
            this.renderTodos();
            this.showAlert('Task deleted!', 'success');
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        this.renderTodos();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'completed': return this.todos.filter(t => t.completed);
            case 'pending': return this.todos.filter(t => !t.completed);
            default: return this.todos;
        }
    }

    renderTodos() {
        const container = document.getElementById('todoList');
        const todos = this.getFilteredTodos();
        if (todos.length === 0) {
            container.innerHTML = `<div class='text-center text-muted py-4'>No tasks found.</div>`;
            return;
        }
        container.innerHTML = todos.map(todo => this.getTodoHTML(todo)).join('');
    }

    getTodoHTML(todo) {
        return `
        <div class="todo-item mb-2 priority-${todo.priority} ${todo.completed ? 'completed' : ''}">
            <div class="d-flex align-items-center justify-content-between">
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" ${todo.completed ? 'checked' : ''} onchange="todoManager.toggleTodo(${todo.id})">
                    <label class="form-check-label">${this.escapeHtml(todo.text)}</label>
                </div>
                <div>
                    <span class="badge bg-${this.getPriorityColor(todo.priority)} me-2">${todo.priority}</span>
                    <span class="text-muted small me-2"><i class="fas fa-calendar"></i> ${todo.dueDate}</span>
                    <button class="btn btn-sm btn-danger" onclick="todoManager.deleteTodo(${todo.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>`;
    }

    getPriorityColor(priority) {
        const colors = { high: 'danger', medium: 'warning', low: 'success' };
        return colors[priority] || 'secondary';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} position-fixed`;
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 250px;';
        alertDiv.innerHTML = `${message}`;
        document.body.appendChild(alertDiv);
        setTimeout(() => { if (alertDiv.parentNode) alertDiv.remove(); }, 2000);
    }

    loadTodos() {
        try {
            const stored = localStorage.getItem('todos');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}
window.todoManager = new TodoManager();