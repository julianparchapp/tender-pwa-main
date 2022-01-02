import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { closeTemplateDialog } from '../store/app/dialogSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SharedDialog = (props) => {
  const dispatch = useDispatch();
  const { IconType, Title, Subtitle } = props;
  const { templateDialog } = useSelector(({ dialogs }) => dialogs);

  return (
    <Dialog
      {...templateDialog.props}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="lg"
      onClose={() => {
        dispatch(closeTemplateDialog());
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
              src={IconType}
              alt="icon-back"
              className="w-28 ih-28 inline-block border-2 border-white rounded-full shadow-lg p-4"
            />
          </div>
          <h3 className="mt-16 text-11 font-700 text-center block">{Title}</h3>
          <span className="block text-8">{Subtitle}</span>
        </div>
      </DialogTitle>
      <DialogContent style={{ background: '#051B34' }}>
        <DialogContentText id="alert-dialog-slide-description">
          <div className="w-full flex justify-center">{props.children}</div>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

SharedDialog.propTypes = {
  IconType: PropTypes.any.isRequired,
  Title: PropTypes.string.isRequired,
  Subtitle: PropTypes.string,
};

export default SharedDialog;
