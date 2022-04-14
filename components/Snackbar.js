import React from 'react';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { shape, string } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const Component = ({
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
}) => {
  const status = useSelector(({ app }) => app.status);
  const dispatch = useDispatch();

  const {
    message,
    duration: _duration,
    isOpen,
    severity,
    label,
    variant,
    action: actionType,
  } = status || {};

  const closeMessage = () => dispatch({ type: 'closeMessage' });
  const actionCloseMessage = () => {
    if (actionType) dispatch({ type: actionType });
    closeMessage();
  };
  const clearMessage = () => dispatch({ type: 'clearMessage' });

  let duration = _duration;
  let action;
  if (duration === 0) {
    action = label ? (
      <Button
        key="close"
        arial-label="close"
        color="inherit"
        onClick={actionCloseMessage}
        size="small"
      >
        {label}
      </Button>
    ) : (
      <IconButton
        key="close"
        aria-label="close"
        color="inherit"
        onClick={actionCloseMessage}
        size="small"
      >
        <Close fontSize="small" />
      </IconButton>
    );
    duration = null;
  }

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={isOpen}
      autoHideDuration={duration}
      message={!severity && message}
      action={!severity && action}
      onClose={closeMessage}
      TransitionProps={{ onExited: clearMessage }}
      ContentProps={{
        sx: { maxWidth: 480 },
      }}
    >
      {severity ? (
        <Alert
          sx={{ maxWidth: 480 }}
          action={action}
          severity={severity}
          variant={variant}
        >
          {message}
        </Alert>
      ) : null}
    </Snackbar>
  );
};

Component.displayName = 'Snackbar';
Component.propTypes = {
  anchorOrigin: shape({
    vertical: string,
    horizontal: string,
  }),
};

export default Component;
