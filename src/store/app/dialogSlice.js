import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const dialogAdapter = createEntityAdapter({});

const initialDialogProducts = {
  type: '',
  props: {
    open: false,
  },
  data: null,
};

const dialogSlice = createSlice({
  name: 'dialogs',
  initialState: dialogAdapter.getInitialState({
    loading: false,
    errors: '',
    comingSoonDiaglog: {
      props: {
        open: false,
      },
    },
    productDiaglog: initialDialogProducts,
    termsDialog: initialDialogProducts,
    templateDialog: initialDialogProducts,
    commentDialog: initialDialogProducts,
    messageDialog: initialDialogProducts,
  }),
  reducers: {
    openComingSoonDialog: (state, action) => {
      state.comingSoonDiaglog = {
        props: {
          open: true,
        },
      };
    },
    closeComingSoonDialog: (state, action) => {
      state.comingSoonDiaglog = {
        props: {
          open: false,
        },
      };
    },
    openProductDialog: (state, action) => {
      state.productDiaglog = {
        type: 'open product',
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeProductDialog: (state) => {
      state.productDiaglog = initialDialogProducts;
    },
    openTermsDialog: (state) => {
      state.termsDialog = {
        type: 'open terms',
        props: {
          open: true,
        },
      };
    },
    closeTermsDialog: (state) => {
      state.termsDialog = initialDialogProducts;
    },
    openTemplateDialog: (state, action) => {
      state.templateDialog = {
        type: 'open',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeTemplateDialog: (state) => {
      state.templateDialog = initialDialogProducts;
    },
    openCommentDialog: (state, action) => {
      state.commentDialog = {
        type: 'open',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeCommentDialog: (state) => {
      state.commentDialog = initialDialogProducts;
    },
    openMessageDialog: (state) => {
      state.messageDialog = {
        type: 'open',
        props: {
          open: true,
        },
        data: null,
      };
    },
    closeMessageDialog: (state) => {
      state.messageDialog = initialDialogProducts;
    },
  },
  extraReducers: {},
});

export const {
  openComingSoonDialog,
  closeComingSoonDialog,
  openProductDialog,
  closeProductDialog,
  openTermsDialog,
  closeTermsDialog,
  openTemplateDialog,
  closeTemplateDialog,
  openCommentDialog,
  closeCommentDialog,
  openMessageDialog,
  closeMessageDialog,
} = dialogSlice.actions;

export default dialogSlice.reducer;
