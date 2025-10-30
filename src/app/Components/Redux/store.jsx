'use client'
import { configureStore } from '@reduxjs/toolkit'
import docSlice  from './docSlice'

export default configureStore({
  reducer: {
    doc: docSlice,
  }
})