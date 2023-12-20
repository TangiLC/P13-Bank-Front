import { createSlice } from '@reduxjs/toolkit';

const updateSlice = createSlice({
  name: 'updateUser',
  initialState: false, 
  reducers: {
    setUpdate: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUpdate } = updateSlice.actions;
export default updateSlice.reducer;