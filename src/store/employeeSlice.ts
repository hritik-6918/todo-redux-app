import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Employee {
  id: number
  name: string
  email: string
  phone: string
}

interface EmployeeState {
  employees: Employee[]
  loading: boolean
  error: string | null
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
}

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users')
  return response.data
})

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false
        state.employees = action.payload
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch employees'
      })
  },
})

export default employeeSlice.reducer
