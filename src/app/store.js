import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from '../features/PasteApp/pasteSlice'
export const store = configureStore({
  reducer: {
    paste:pasteReducer
  },
})