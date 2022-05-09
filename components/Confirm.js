import React from 'react';
import { confirmable } from 'react-confirm';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { bool, func, string, object } from 'prop-types';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const Confirm = ({
  show,
  proceed,
  cancel,
  confirmation,
  theme,
  okLabel,
  color = 'secondary',
  variant = 'contained',
  cancelLabel,
}) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <Dialog disableEnforceFocus onClose={cancel} open={show}>
        <DialogContent>
          <DialogContentText>{confirmation}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={cancel}>
            {cancelLabel}
          </Button>
          <Button color={color} variant={variant} onClick={proceed}>
            {okLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  </StyledEngineProvider>
);

Confirm.displayName = 'FormsConfirmDialog';
Confirm.propTypes = {
  show: bool.isRequired,
  proceed: func.isRequired,
  dismiss: func.isRequired,
  cancel: func.isRequired,
  confirmation: string.isRequired,
  theme: object.isRequired,
  okLabel: string.isRequired,
  cancelLabel: string.isRequired,
  color: string,
  variant: string,
};

export default confirmable(Confirm);
