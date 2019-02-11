import { getFilters } from './filters'
import { getTodos, toggleTodo, saveTodos, removeTodo } from './todos'

// renderTodos
const renderTodos = () => {
  const todos = getTodos()
  const { searchText, hideCompleted } = getFilters()

  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
    const hideCompletedMatch = !hideCompleted || !todo.completed

    return searchTextMatch && hideCompletedMatch
  })

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed)

  const todosElement = document.querySelector('#todos')
  const summaryMessage = document.getElementById('summary-message')
  todosElement.innerHTML = ''
  summaryMessage.textContent = generateSummaryDOM(incompleteTodos).textContent

  for (const todo of filteredTodos) {
    document.querySelector('#todos').appendChild(generateTodoDOM(todo))
  }
}

// Get DOM elements for individual note
const generateTodoDOM = todo => {
  const todoElement = document.createElement('div')
  const textElement = document.createElement('input')
  const prepend = document.createElement('div')
  const prependText = document.createElement('div')
  const checkbox = document.createElement('input')
  const append = document.createElement('div')
  const button = document.createElement('button')

  // Setup todoElement
  todoElement.classList.add('input-group', 'mb-1')

  // Setup checkbox
  prepend.classList.add('input-group-prepend')
  prependText.classList.add('input-group-text')
  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = todo.completed
  prepend.appendChild(prependText)
  prependText.appendChild(checkbox)
  checkbox.addEventListener('change', (event) => {
    toggleTodo(todo.id)
    saveTodos(todos)
    renderTodos()
  })

  // Setup the remove todo button
  button.textContent = 'X'
  button.classList.add('btn', 'btn-outline-danger')
  append.appendChild(button)
  append.classList.add('input-group-append')
  button.addEventListener('click', () => {
    removeTodo(todo.id)
    saveTodos(todos)
    renderTodos()
  })

  // Setup text element
  textElement.value = todo.text
  textElement.classList.add('form-control', 'bg-white')
  textElement.disabled = true

  // Append Elements
  todoElement.append(prepend)
  todoElement.append(textElement)
  todoElement.appendChild(append)

  return todoElement
}

// Get DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement('h2')
  summary.textContent = `You have ${incompleteTodos.length} todos left`
  return summary
}


// Make sure to set up the exports
export { renderTodos, generateTodoDOM, generateSummaryDOM }