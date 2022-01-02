import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { closeComingSoonDialog } from '../../store/app/dialogSlice';
import LogoWuayWhite from '../../images/icons/Logo-white.svg';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComingSoon = () => {
  const dispatch = useDispatch();
  const { comingSoonDiaglog } = useSelector(({ dialogs }) => dialogs);

  return (
    <Dialog
      {...comingSoonDiaglog.props}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="lg"
      onClose={() => {
        dispatch(closeComingSoonDialog());
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
        <div>
          <div className="flex justify-center">
            <img
              src={LogoWuayWhite}
              alt="icon-back"
              className="w-44 h-44 inline-block border-2 border-white rounded-full"
            />
          </div>
          <h3 className="mt-16 text-11 font-600 text-center block">
            ¿Tienes ganas de conocer a gente nueva?
          </h3>
        </div>
      </DialogTitle>
      <DialogContent style={{ background: '#051B34' }}>
        <DialogContentText id="alert-dialog-slide-description">
          <div className="my-8 py-4 text-white">
            <p className="text-10 font-400 text-center">
              Tranquilo, que muy pronto <span className="font-600 underline">Wuay</span> te
              permitira conocer a gente nueva de una forma sencilla
            </p>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComingSoon;
