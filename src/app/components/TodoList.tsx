'use client'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { addTodo, toggleTodo, deleteTodo, updateTodo } from '../../store/todoSlice'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todos)
  const dispatch = useDispatch()
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo))
      setNewTodo('')
    }
  }

  const handleEditTodo = (id: number, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const handleUpdateTodo = (id: number) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, text: editText }))
      setEditingId(null)
      setEditText('')
    }
  }

  if (!isClient) {
    return null // or a loading indicator
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id} className="flex items-center mb-2">
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border p-2 mr-2"
                />
                <button
                  onClick={() => handleUpdateTodo(todo.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                  className="mr-2"
                />
                <span className={todo.completed ? 'line-through' : ''}>{todo.text}</span>
                <button
                  onClick={() => handleEditTodo(todo.id, todo.text)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded ml-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

