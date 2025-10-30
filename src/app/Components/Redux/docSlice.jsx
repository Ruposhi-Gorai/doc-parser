'use client'
import { createSlice } from '@reduxjs/toolkit'

// const reader = new FileReader();
// reader.onload = () => {
//   console.log(reader.result); // file content as string or base64
// };

export const docSlice = createSlice({

  name: 'doc',
  initialState: {
    value: []
  },
  reducers: {
    increment: state => {
      
    },
    decrement: state => {
    },
    addFile: (state, action) => {
        state.value = action.payload
    }

  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, addFile } = docSlice.actions

export default docSlice.reducer