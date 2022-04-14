import withReduxState from '../.storybook/withReduxState';
import Snackbar from '../components/Snackbar';

export default {
  title: 'Snackbar',
};

export const standardMessage = withReduxState(
  [{ type: 'addMessage', payload: 'This is a standard message' }],
  Snackbar,
);

export const standardMessageUsingMessageProp = withReduxState(
  [{ type: 'addMessage', payload: { message: 'This is a standard message' } }],
  Snackbar,
);

export const standardMessageWithNoDuration = withReduxState(
  [
    {
      type: 'addMessage',
      payload: {
        message: 'This is a standard message with no duration',
        duration: 0,
      },
    },
  ],
  Snackbar,
);

export const longMessageWithNoDuration = withReduxState(
  [
    {
      type: 'addMessage',
      payload: {
        message:
          'This is a long message with no duration and it should show a close button to the right of this long length of text that seems to go on forever',
        duration: 0,
      },
    },
  ],
  Snackbar,
);

export const longMessageWithLabel = withReduxState(
  [
    {
      type: 'addMessage',
      payload: {
        message:
          'This is a long message with no duration and it should show a close button to the right of this long length of text that seems to go on forever',
        duration: 0,
        label: 'OK',
      },
    },
  ],
  Snackbar,
);

export const standardMessageWithDuration = withReduxState(
  [
    {
      type: 'addMessage',
      payload: {
        message: 'This is a standard message with a duration',
        duration: 3000,
      },
    },
  ],
  Snackbar,
);

export const warningMessage = withReduxState(
  [
    {
      type: 'addMessage',
      payload: {
        message: 'This is a warning message',
        severity: 'warning',
      },
    },
  ],
  Snackbar,
);

export const infoMessage = withReduxState(
  [
    {
      type: 'addMessage',
      payload: {
        message: 'This is an info message',
        severity: 'info',
      },
    },
  ],
  Snackbar,
);

export const errorMessage = withReduxState(
  [
    {
      type: 'addMessage',
      payload: {
        message: 'This is an error message',
        severity: 'error',
      },
    },
  ],
  Snackbar,
);

export const successMessage = withReduxState(
  [
    {
      type: 'addMessage',
      payload: {
        message: 'This is a success message',
        severity: 'success',
      },
    },
  ],
  Snackbar,
);

export const successMessageWithClose = withReduxState(
  [
    {
      type: 'addMessage',
      payload: {
        message: 'This is a success message with a close button',
        severity: 'success',
        duration: 0,
      },
    },
  ],
  Snackbar,
);

export const longSuccessMessageWithClose = withReduxState(
  [
    {
      type: 'addMessage',
      payload: {
        message:
          'This is a long message with no duration and it should show a close button to the right of this long length of text that seems to go on forever',
        severity: 'success',
        duration: 0,
      },
    },
  ],
  Snackbar,
);

export const longSuccessMessageWithLabel = withReduxState(
  [
    {
      type: 'addMessage',
      payload: {
        message:
          'This is a long message with no duration and it should show a close button to the right of this long length of text that seems to go on forever',
        severity: 'success',
        duration: 0,
        label: 'Thanks!',
      },
    },
  ],
  Snackbar,
);
