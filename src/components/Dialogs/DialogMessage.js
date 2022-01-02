import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeMessageDialog } from '../../store/app/dialogSlice';
import IconSend from '../../images/icons/Icon-Send.svg';
import { postMessages } from '../../store/app/messageSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogMessage = () => {
  const dispatch = useDispatch();
  const { messageDialog } = useSelector(({ dialogs }) => dialogs);
  const [message, setMessage] = useState('');
  const { errors, loading } = useSelector((state) => state.message);
  const handleSendMessage = () => {
    dispatch(
      postMessages({
        message,
        is_public: true,
        is_dialog: true,
      })
    );
  };

  return (
    <Dialog
      {...messageDialog.props}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="lg"
      onClose={() => {
        dispatch(closeMessageDialog());
      }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        style: { borderRadius: '1.2rem', minWidth: '90%' },
      }}
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        className="relative text-white w-full flex flex-col justify-center"
        style={{ background: '#051B34' }}
      >
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 flex justify-center">
            <img
              src={IconSend}
              alt="icon-back"
              className="w-28 ih-28 inline-block border-2 border-white rounded-full shadow-lg p-4"
            />
          </div>
          <h3 className="mt-16 text-11 font-700 text-center block">Mensaje</h3>
        </div>
      </DialogTitle>
      <DialogContent style={{ background: '#051B34' }}>
        <DialogContentText id="alert-dialog-slide-description">
          <div className="w-full flex flex-col justify-center space-y-8">
            <div className="flex">
              <TextField
                id="comment"
                name="comment"
                label=""
                value={message}
                variant="outlined"
                fullWidth
                multiline
                maxRows={4}
                className="bg-white"
                placeholder="Escribe tu mensaje ..."
                error={errors && errors.hasOwnProperty('message')}
                helperText={errors?.message && errors?.message[0]}
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
              />
            </div>
            <div>
              {loading ? (
                <CircularProgress style={{ color: '#FF004E' }} />
              ) : (
                <Button
                  variant="contained"
                  className="block w-full py-4 px-16 rounded-8"
                  style={{ background: '#FF004E', color: '#FFF' }}
                  onClick={handleSendMessage}
                >
                  Enviar
                </Button>
              )}
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default DialogMessage;
