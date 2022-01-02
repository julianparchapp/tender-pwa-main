import React from 'react';
import { Dialog, DialogContent, DialogContentText, Slide } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import numeral from 'numeral';
import { closeProductDialog } from '../../store/app/dialogSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogProductDescription = () => {
  const dispatch = useDispatch();
  const {
    productDiaglog: { data, props },
  } = useSelector(({ dialogs }) => dialogs);

  return (
    <Dialog
      {...props}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="lg"
      onClose={() => {
        dispatch(closeProductDialog());
      }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        style: { borderRadius: '1rem', minWidth: '90%' },
      }}

      // className="relative"
    >
      <DialogContent style={{ background: '#FFF' }}>
        <DialogContentText id="alert-dialog-slide-description">
          <div className="w-full flex flex-col justify-around space-y-24 items-center mb-8">
            <div className="w-full relative bg-red">
              <div className="w-20 h-20 absolute top-0 right-0 p-2 flex items-center border-1 border-black rounded-2">
                <button
                  type="button"
                  className="inline-block w-16 h-16 rounded-full font-800 text-black"
                  onClick={() => {
                    dispatch(closeProductDialog());
                  }}
                >
                  X
                </button>
              </div>
            </div>
            <h3
              className="block w-full text-11 font-600 text-black text-center "
              // style={{ paddingTop: '1.8rem' }}
            >
              {data?.name}
            </h3>
          </div>
          {data?.photo?.url && (
            <div className="flex justify-center">
              <img
                src={data?.photo?.url}
                alt="icon-back"
                className="w-full inline-block rounded-12"
              />
            </div>
          )}
          <div className="my-8 py-4 text-black flex flex-col space-y-8">
            <p className="text-10 font-600 pb-4 border-b-1 border-gray-300">Descripción:</p>
            <p className="text-10 font-400 text-left mb-4">{data?.description}</p>
            <div className="flex flex-col space-y-8">
              {data?.productVariants?.data?.map((variant) => (
                <div className="flex justify-between border-b-1 border-gray-300">
                  <p className="text-10 font-600">{variant?.name}</p>
                  <p className="text-10 font-600 pb-4">{numeral(variant?.price).format('$ 0,0')}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="w-full block py-4 text-center text-white rounded-4"
              style={{ background: '#051B34' }}
              onClick={() => {
                dispatch(closeProductDialog());
              }}
            >
              Volver al Menú
            </button>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default DialogProductDescription;
