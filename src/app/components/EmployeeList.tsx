'use client'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../../store'
import { fetchEmployees, Employee } from '../../store/employeeSlice'

export default function EmployeeList() {
  const dispatch = useDispatch<AppDispatch>()
  const { employees, loading, error } = useSelector((state: RootState) => state.employees)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    dispatch(fetchEmployees())
  }, [dispatch])

  if (!isClient) {
    return null // or a loading indicator
  }

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <ul className="space-y-4">
        {employees.map((employee: Employee) => (
          <li key={employee.id} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p className="text-gray-600">Email: {employee.email}</p>
            <p className="text-gray-600">Phone: {employee.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

