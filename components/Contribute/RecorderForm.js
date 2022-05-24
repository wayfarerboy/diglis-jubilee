import React from 'react';
import { shape, bool, func, string } from 'prop-types';
import createDecorator from 'final-form-focus';
import { FormSpy, Form, Field as FinalFormField } from 'react-final-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Replay from '@mui/icons-material/Replay';

import useConfirm from '../../hooks/useConfirm';
import Preview from './RecorderPreview';

const focusOnErrors = createDecorator();

const Field = ({
  input: { name, onChange: change } = {},
  meta: { submitting } = {},
  ...props
}) => {
  const onChange = (ev) => change(ev.target.value);
  return (
    <TextField
      {...props}
      name={name}
      onChange={onChange}
      disabled={submitting}
    />
  );
};

Field.displayName = 'ContributeRecorderFormField';
Field.propTypes = {
  input: shape({
    value: string,
    name: string,
    onChange: func,
  }),
  meta: shape({
    submitting: bool,
  }),
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateEmail = (val) => {
  if (val && !emailRegex.test(val)) return 'Not a valid email address';
  return undefined;
};

const RecorderForm = ({
  size = 'medium',
  onRecord,
  audioSrc,
  audioType,
  handleSubmit,
}) => {
  const confirm = useConfirm({ okLabel: 'Yes' });

  const onRecordAgain = async () => {
    await confirm(
      'Are you sure you want to record again? This will discard the current recording.',
    );
    onRecord();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ m: 2 }}>
      <FormControl fullWidth>
        <InputLabel sx={{ ml: 1.5 }} required shrink>
          Recording
        </InputLabel>
        <Preview
          sx={{ mt: 2, width: '100%', mb: 1 }}
          src={audioSrc}
          type={audioType}
        />
        <FormSpy
          subscription={{ submitting: true }}
          render={({ submitting }) => (
            <Button
              startIcon={
                <Replay
                  sx={{ position: 'relative', top: -2 }}
                  fontSize="small"
                />
              }
              fullWidth
              size="small"
              variant="outlined"
              disabled={submitting}
              onClick={onRecordAgain}
              sx={{ mb: 2, mx: 'auto' }}
            >
              Record again
            </Button>
          )}
        />
      </FormControl>
      <FinalFormField
        fullWidth
        name="name"
        label="Full name"
        size={size}
        helperText="We use your name to credit you in the project"
        required
        autoComplete="name"
        component={Field}
        margin="normal"
      />
      <FinalFormField
        fullWidth
        name="email"
        label="Email address"
        helperText="We use your email so we can contact you if we need more details"
        size={size}
        type="email"
        validate={validateEmail}
        required
        autoComplete="email"
        component={Field}
        margin="normal"
      />
      <FormSpy
        subscription={{ invalid: true, submitting: true }}
        render={({ invalid, submitting }) => (
          <Button
            sx={{ mt: 2 }}
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            disabled={invalid || submitting}
          >
            Submit
          </Button>
        )}
      />
    </Box>
  );
};

RecorderForm.displayName = 'ContributeRecorderForm';
RecorderForm.propTypes = {
  onRecord: func,
  audioSrc: string,
  audioType: string,
  handleSubmit: func,
};

const Wrapper = ({ onSubmit, audioType, audioSrc, onRecord }) =>
  audioSrc ? (
    <Form
      audioSrc={audioSrc}
      audioType={audioType}
      onRecord={onRecord}
      onSubmit={onSubmit}
      decorators={[focusOnErrors]}
      render={RecorderForm}
    />
  ) : null;

Wrapper.displayName = 'ContributeRecorderFormWrapper';
Wrapper.propTypes = {
  audioType: string,
  onRecord: func,
  audioSrc: string,
  onSubmit: func,
};

export default Wrapper;
