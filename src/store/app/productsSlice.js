import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import productsService from '../../services/apiService/productsService';

export const getProdutsByCategory = createAsyncThunk(
  'products/getProdutsByCategory',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await productsService.getProductsByCategory(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductsById } =
  productsAdapter.getSelectors((state) => state.products);

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState({
    errors: {},
    loading: false,
    productFilter: [],
    filter: 0,
    productDialog: {
      type: 'new',
      props: {
        open: false,
      },
      data: null,
    },
  }),
  reducers: {},
  extraReducers: {
    [getProdutsByCategory.pending]: (state) => {
      state.loading = true;
    },
    [getProdutsByCategory.fulfilled]: (state, action) => {
      state.loading = false;
      productsAdapter.setAll(state, action.payload);
    },
    [getProdutsByCategory.rejected]: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
  },
});

export default productsSlice.reducer;
