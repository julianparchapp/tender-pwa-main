import { combineReducers } from '@reduxjs/toolkit';
import message from './app/messageSlice';
import commerces from './app/commerceSlice';
import dialogs from './app/dialogSlice';
import categories from './app/categorySlice';
import products from './app/productsSlice';
import login from './app/loginSlice';
import alert from './app/alertSlice';
import groupUser from './app/groupUserSlice';
import user from './app/userSlice';
import interests from './app/interestSlice';

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    ...asyncReducers,
    commerces,
    dialogs,
    categories,
    products,
    login,
    message,
    alert,
    groupUser,
    user,
    interests,
  });
  return combinedReducer(state, action);
};

export default createReducer;
