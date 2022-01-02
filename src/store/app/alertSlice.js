import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const alertAdapter = createEntityAdapter({});

const alertSlice = createSlice({
  name: 'alert',
  initialState: alertAdapter.getInitialState({
    message: '',
    severity: '',
    open: false,
  }),
  reducers: {
    openAlert: (state, action) => {
      state.message = action?.payload?.message;
      state.severity = action?.payload.severity;
      state.open = true;
    },
    closeAlert: (state) => {
      state.message = '';
      state.severity = '';
      state.open = false;
    },
  },
});

export const { openAlert, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;
