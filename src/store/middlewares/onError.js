import { isObject } from 'lodash';

// import { showMessage } from '../fuse/messageSlice';

const rejected =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action?.meta?.requestStatus === 'rejected') {
      // console.log(action);
      if (Object?.keys(action?.payload)?.length === 0) {
        // console.log("ERROR: ",action.payload);
        // dispatch(
        //   showMessage({
        //     message: action.payload,
        //     variant: 'error',
        //   })
        // );
        return next(action);
      }

      if (action?.type?.includes('forgotPassword') && action?.payload?.email) {
        // console.log("ERROR: ",action.action.payload.email[0]);
        // dispatch(
        //   showMessage({
        //     message: action.payload.email[0],
        //     variant: 'error',
        //   })
        // );
        return next(action);
      }

      if (isObject(action?.payload) && Object.keys(action?.payload).length > 0) {
        console.log('Ha ocurrido un error al guardar.: ');
        // dispatch(
        //   showMessage({
        //     message: 'Ha ocurrido un error al guardar.',
        //     variant: 'error',
        //   })
        // );
        return next(action);
      }

      if (typeof action?.payload === 'string') {
        console.log('ERROR : ', action.payload);
        // dispatch(
        //   showMessage({
        //     message: action.payload,
        //     variant: 'error',
        //   })
        // );
        return next(action);
      }
    }
    return next(action);
  };

export default rejected;
