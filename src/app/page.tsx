'use client'

import { Provider } from 'react-redux'
import { store } from '../store'
import TodoList from './components/TodoList'
import EmployeeList from './components/EmployeeList'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

export default function Home() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container mx-auto p-4">
          <nav className="mb-4">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-blue-500 hover:underline">Todo List</Link>
              </li>
              <li>
                <Link to="/employees" className="text-blue-500 hover:underline">Employee List</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/employees" element={<EmployeeList />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  )
}
