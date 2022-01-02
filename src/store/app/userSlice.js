import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import jwtService from '../../services/jwtService';
import history from '../../@history';
import authService from '../../services/apiService/authService';

export const setUserData = (user) => async (dispatch, getState) => {
  /* You can redirect the logged-in user to a specific route depending on his role */
  // const idMenu = window.localStorage.getItem('@Menu');
  //
  // if (user) {
  //   history.push('/chat-public');
  // } else {
  //   history.push(`/home/${idMenu}`);
  // }
  dispatch(getInfoUser());
  // dispatch(setUser(user));
};

export const getInfoUser = createAsyncThunk(
  'user/getInfoUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const idMenu = window.localStorage.getItem('@Menu') || 0;
      const dataUser = await authService.getAuthMe();

      if (dataUser) {
        dispatch(setUser(dataUser));
        // history.push('/chat-public');
        // history.go(0);
      } else {
        history.push(`/home/${idMenu}`);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = () => async (dispatch) => {
  jwtService.logout();
  history.push('/login');
  history.go(0);

  return dispatch(userLoggedOut());
};

const initialState = {
  role: [], // guest
  data: {
    displayName: 'John Doe',
    photoURL: 'assets/images/avatars/Velazquez.jpg',
    email: 'johndoe@withinpixels.com',
    shortcuts: ['calendar', 'mail', 'contacts', 'todo'],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {
    [getInfoUser.pending]: (state) => {
      state.loading = true;
    },
    [getInfoUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [getInfoUser.rejected]: (state, action) => {
      state.loading = false;
      state.user = null;
    },
  },
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
