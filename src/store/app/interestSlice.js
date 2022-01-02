import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import interestService from '../../services/apiService/interestService';
import { openAlert } from './alertSlice';

export const getInterest = createAsyncThunk(
  'interests/getInterest',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await interestService.getInterest();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveGroupInterest = createAsyncThunk(
  'interests/saveGroupInterest',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        openAlert({ message: 'Se ha registrado los intereses corractamente', severity: 'success' })
      );
      // history.push('/chat-public');
      return await interestService.saveGroupInterest(data);
    } catch (error) {
      dispatch(
        openAlert({
          message: 'No se pudo registar los intereses correctamente.',
          severity: 'error',
        })
      );
      return rejectWithValue(error);
    }
  }
);

const interestAdapter = createEntityAdapter({});

export const { selectAll: selectInterests } = interestAdapter.getSelectors(
  (state) => state.interests
);

const interestsSlice = createSlice({
  name: 'interests',
  initialState: interestAdapter.getInitialState({
    loading: false,
    errors: '',
    data: null,
  }),
  reducers: {},
  extraReducers: {
    [getInterest.pending]: (state) => {
      state.loading = true;
    },
    [getInterest.fulfilled]: (state, action) => {
      state.loading = false;
      interestAdapter.setAll(state, action.payload);
    },
    [getInterest.rejected]: (state, action) => {
      state.loading = false;
      state.errors = 'Error al traer los intereses';
    },
  },
});

export default interestsSlice.reducer;
