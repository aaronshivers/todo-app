import uuidv4 from 'uuid/v4'

// Setup the empty todos array
let todos = []

// Load existing todos from localStorage
const loadTodos = () => {
  const todosJSON = localStorage.getItem('todos')

  try {
    return todosJSON ? JSON.parse(todosJSON) : []
  } catch (error) {
    return []
  }
}

// Save todos to localStorage
const saveTodos = () => localStorage.setItem('todos', JSON.stringify(todos))

// Exposes todos to other files
const getTodos = () => todos

// Create todo, save data, and return the id
const createTodo = todoText => {
  const id = uuidv4()

  todos.push({
    id,
    text: todoText,
    completed: false
  })
  saveTodos()

  return id
}

// Remove todo by id and save data
const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id)

  if (todoIndex >= 0) {
    todos.splice(todoIndex, 1)
    saveTodos()
  }
}

// Toggle completed value and save
const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id)

  if (todo) {
    todo.completed = !todo.completed
    saveTodos()
  }
}

todos = loadTodos()

export { loadTodos, saveTodos, getTodos, createTodo, removeTodo, toggleTodo }
