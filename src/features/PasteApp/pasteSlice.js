import { createSlice } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';
const initialState = {
    //Checks if localStorage has a key called "pastes".
  pastes: localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')):[]
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addTopastes: (state,action) => {
      const paste=action.payload;
      const isSame=state.pastes.some((obj)=> obj.title.toLowerCase()===paste.title.toLowerCase())
      if(isSame)
      {
          toast.error('Title already exists');
          return;
      }
      state.pastes.push(paste);
      localStorage.setItem('pastes',JSON.stringify(state.pastes))
      toast.success('Paste is created successfully')
    },
    deleteFrompastes: (state,action) => {
      const pasteId=action.payload;
      const index=state.pastes.findIndex(obj=>obj._id === pasteId)
      if(index!==-1) {
        state.pastes.splice(index,1);
        localStorage.setItem('pastes',JSON.stringify(state.pastes));
        toast.success('paste is deleted')
      }
    },
    updateTopastes: (state, action) => {
       const paste=action.payload;
       const isSame=state.pastes.some((obj)=>obj._id !=paste._id && obj.title.toLowerCase() === paste.title.toLowerCase())
       if(isSame)
       {
        toast.error('Title already Exists');
        return;
       }
       const index=state.pastes.findIndex((obj)=> obj._id===paste._id)    //if not found then return -1
       if(index>=0)
       {
            state.pastes[index]=paste;
             localStorage.setItem('pastes',JSON.stringify(state.pastes));
             toast.success('Paste updated successfully')
       }
    },
    resteAllpastes:(state, action)=>{
          state.pastes=[];
          localStorage.removeItem('pastes');
    }
  },
})

// Action creators are generated for each case reducer function
export const { addTopastes, deleteFrompastes, updateTopastes,resteAllpastes } = pasteSlice.actions
export default pasteSlice.reducer