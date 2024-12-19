import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const initialState: Todo[] = []

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      }
      state.push(newTodo)
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find(todo => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter(todo => todo.id !== action.payload)
    },
    updateTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.find(todo => todo.id === action.payload.id)
      if (todo) {
        todo.text = action.payload.text
      }
    },
  },
})

export const { addTodo, toggleTodo, deleteTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer

