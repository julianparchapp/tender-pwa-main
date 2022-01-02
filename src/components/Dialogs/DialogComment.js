import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from '@mui/material';
import { closeCommentDialog } from '../../store/app/dialogSlice';
import IconSend from '../../images/icons/Icon-Send.svg';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComment = () => {
  const dispatch = useDispatch();
  const { commentDialog } = useSelector(({ dialogs }) => dialogs);
  const [comment, setCommet] = useState('Escribe tu comentario...');

  return (
    <Dialog
      {...commentDialog.props}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="lg"
      onClose={() => {
        dispatch(closeCommentDialog());
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
          <h3 className="mt-16 text-11 font-700 text-center block">Dejanos tus comentarios</h3>
        </div>
      </DialogTitle>
      <DialogContent style={{ background: '#051B34' }}>
        <DialogContentText id="alert-dialog-slide-description">
          <div className="w-full flex flex-col justify-center space-y-8">
            <div className="flex">
              <TextField
                // error={!!errors?.comment}
                // helperText={errors?.comment && errors?.comment}
                id="comment"
                name="comment"
                label=""
                value={comment}
                variant="outlined"
                fullWidth
                multiline
                maxRows={4}
                className="bg-white"
                onChange={(event) => {
                  setCommet(event.target.value);
                }}
              />
            </div>
            <div>
              <Button
                variant="contained"
                className="block w-full py-4 px-16 rounded-8"
                style={{ background: '#FF004E', color: '#FFF' }}
                onClick={() => {
                  // dispatch(closeTemplateDialog());
                  // history.push('/chat-public');
                  dispatch(closeCommentDialog());
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComment;
