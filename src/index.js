import { loadTodos, saveTodos, getTodos, createTodo, removeTodo, toggleTodo } from './todos'
import { renderTodos } from './views'
import { setFilters } from './filters'

// Render initial todos
renderTodos()

// Set up search text handler
document.querySelector('#todo-search').addEventListener('input', event => {
  setFilters({
    searchText: event.target.value
  })
  renderTodos()
})

// Set up checkbox handler
document.querySelector('#hide-completed').addEventListener('change', event => {
  setFilters({
    hideCompleted: event.target.checked
  })
  renderTodos()
})

// Set up form submission handler
document.querySelector('#form').addEventListener('submit', event => {
  const todoText = event.target.elements.text.value
  const id = createTodo(todoText)
})

// watcher for local storage
window.addEventListener('storage', event => {
  if (event.target === 'todos') {
    renderTodos()
  }
})