import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import React from 'react';
import { closeTermsDialog } from '../../store/app/dialogSlice';
import IconAlert from '../../images/icons/Icon-Alert-Triangle.svg';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DataCondicions = [
  {
    id: 1,
    caption: 'Puedes recibir servilleas virtuales solo si aceptas o aceptan tu invitación de mesa.',
  },
  { id: 2, caption: 'Puedes silenciar en cualquier momento grupos que te incomoden.' },
  { id: 3, caption: 'No compartimos datos personales sin tu autorización.' },
  { id: 4, caption: 'Cuentas con 2 horas para romper el hielo.' },
];

const DialogTerms = () => {
  const dispatch = useDispatch();
  const { termsDialog } = useSelector(({ dialogs }) => dialogs);

  return (
    <Dialog
      {...termsDialog.props}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="lg"
      onClose={() => {
        dispatch(closeTermsDialog());
      }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        style: { borderRadius: '1.2rem' },
      }}
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        className="relative text-white w-full flex flex-col justify-center"
        style={{ background: '#051B34' }}
      >
        <div className="flex flex-col items-center relative">
          <div className="w-36 h-36 flex justify-center">
            <img
              src={IconAlert}
              alt="icon-back"
              className="w-36 h-36 inline-block border-2 border-white rounded-full shadow-lg p-4"
            />
          </div>
          <h3 className="mt-16 text-11 font-700 text-center block">Condiciones</h3>
          <div className="w-14 h-14 absolute top-0 right-0 flex items-center border-1 border-white rounded-2">
            <button
              type="button"
              className="block w-18 h-18 mx-auto flex justify-center items-center"
              onClick={() => {
                dispatch(closeTermsDialog());
              }}
            >
              <span className="block text-center text-white p-0 m-0 font-700 text-10">x</span>
            </button>
          </div>
        </div>
      </DialogTitle>
      <DialogContent style={{ background: '#051B34' }}>
        <DialogContentText id="alert-dialog-slide-description">
          <div
            className="my-8 py-4 text-white flex flex-col space-y-8"
            style={{ width: '80%', margin: '0 auto' }}
          >
            {DataCondicions.map((item) => (
              <p id={item.id} className="text-10 font-400 text-center">
                <span className="font-600" style={{ color: '#FF004E' }}>
                  {item.id}
                </span>
                . {item.caption}
              </p>
            ))}
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTerms;
