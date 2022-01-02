import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import categoriesService from '../../services/apiService/categoriesService';

export const getCategories = createAsyncThunk(
  'categories/getCategories',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await categoriesService.getCategories(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCategoriesByUser = createAsyncThunk(
  'categories/getCategoriesByUser',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await categoriesService.getCategoryByUser(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoriesById } =
  categoriesAdapter.getSelectors((state) => state.categories);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesAdapter.getInitialState({
    searchText: '',
    errors: {},
    loading: false,
    selectCategory: 0,
    categoryDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
    idCommerce: 0,
  }),
  reducers: {
    setCategoriesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
    setSelectCategory: {
      reducer: (state, action) => {
        state.selectCategory = action.payload;
      },
    },
  },
  extraReducers: {
    [getCategoriesByUser.pending]: (state) => {
      state.loading = true;
    },
    [getCategoriesByUser.fulfilled]: (state, action) => {
      state.loading = false;
      categoriesAdapter.setAll(state, action.payload);
    },
    [getCategoriesByUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setCategoriesSearchText, setSelectCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
