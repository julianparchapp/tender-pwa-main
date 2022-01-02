import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authRepository from '../../repositories/authRepository';
import jwtService from '../../services/jwtService';
import { getInfoUser } from './userSlice';
import { openAlert } from './alertSlice';

export const registerUser = createAsyncThunk(
  'login/registerUser',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const result = await authRepository.registerUser(data);
      // eslint-disable-next-line camelcase
      const { id_token_string, commerce_id } = data;
      dispatch(submitLogin({ id_token_string, commerce_id }));
      // console.log('REGISTER', result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const result = await authRepository.loginUser(data);
      // TODO: AGREGAR EL TOKEN AL STORAGE
      // console.log('REGISTER', result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitLogin =  // eslint-disable-next-line camelcase
  ({ id_token_string, commerce_id }) =>
  async (dispatch) => {
    return jwtService
      .signInWithEmailAndPassword(id_token_string, commerce_id)
      .then((user) => {
        // console.log('user ??', user);
        // const data = {
        //   role: ['user'],
        //   data: {
        //     displayName: 'usuario',
        //     photoURL: 'photo',
        //     email: 'email user',
        //     displayUser: 'user',
        //     diplayDocument: 'email',
        //   },
        // };
        // jwtService.signInWithToken();

        dispatch(getInfoUser());
        // dispatch(
        //   showMessage({
        //     message: 'Inicio de sesión satisfactorio',
        //     variant: 'success',
        //   })
        // );
        return dispatch(loginSuccess());
      })
      .catch((errors) => {
        dispatch(openAlert({ message: 'Usuario o contraseña incorrectos', severity: 'error' }));
        // dispatch(
        //   showMessage({
        //     message: errors,
        //     variant: 'error',
        //   })
        // );
        return dispatch(loginError(errors));
      });
  };

const initialState = {
  success: false,
  errors: [],
  dataLogin: null,
  loading: false,
  dataRegister: null,
  user: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    loginError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
    setDataLogin: (state, action) => {
      state.dataLogin = action.payload;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.dataRegister = action.payload;
    },
    [registerUser.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { loginSuccess, loginError, setDataLogin } = loginSlice.actions;

export default loginSlice.reducer;
