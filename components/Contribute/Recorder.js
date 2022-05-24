import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic';
import { ThemeProvider } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { string, bool } from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';

import useWidth from '../../hooks/useWidth';
import { darkTheme } from '../../helpers/theme';
import Intro from './Intro';
import Loading from '../Loading';
import Form from './RecorderForm';

const RecorderButton = dynamic(() => import('./RecorderButton'), {
  loading: Loading,
  ssr: false,
});

const Recorder = ({
  size = 'small',
  intro: _intro = true,
  open: _open = false,
}) => {
  const [open, setOpen] = useState(_open);
  const dispatch = useDispatch();
  const width = useWidth();
  const [intro, setIntro] = useState(_intro);
  const isApple = useSelector(({ app }) => app.isApple);
  const [audioSrc, setAudioSrc] = useState();
  const [audioType, setAudioType] = useState();
  const blob = useRef(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => {
    setOpen(false);
  };
  const onExited = () => {
    setIntro(true);
    setSaving(false);
    setSaved(false);
    setAudioSrc();
    setAudioType();
  };

  const onSave = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    formData.append(
      'audio',
      blob.current,
      `${values.name}.${isApple ? 'mp3' : 'webm'}`,
    );
    try {
      setSaving(true);
      await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      dispatch({
        type: 'addMessage',
        payload: 'Memory successfully submitted. Thanks!',
        severity: 'success',
        duration: 5000,
      });
      setSaved(true);
    } catch (err) {
      dispatch({ type: 'addMessage', payload: err.message });
    }
    setSaving(false);
  };

  const onRecorded = (_blob) => {
    blob.current = _blob;
    setAudioSrc(URL.createObjectURL(_blob));
    setAudioType(_blob.type);
  };

  const onReset = () => {
    blob.current = null;
    setAudioSrc();
    setSaved(false);
  };

  const onExitIntro = () => {
    setIntro(false);
  };

  return (
    <>
      <Button
        sx={{ pointerEvents: 'auto' }}
        onClick={onOpen}
        variant="contained"
        size={size}
        color="primary"
      >
        Get involved
      </Button>
      <ThemeProvider theme={darkTheme}>
        <Dialog
          TransitionProps={{ onExited }}
          open={open}
          onClose={onClose}
          maxWidth="xs"
          fullWidth
          fullScreen={width === 'xs'}
        >
          <DialogTitle>
            {intro
              ? 'Get involved'
              : saved
              ? 'Thanks for the memory!'
              : audioSrc
              ? 'Add your memory'
              : 'Record your memory'}
          </DialogTitle>
          <DialogContent>
            {intro ? (
              <Intro onNext={onExitIntro} />
            ) : (
              <Grid container>
                {!saved && (
                  <>
                    {!audioSrc && (
                      <Grid item xs={12}>
                        <Typography variant="body2" paragraph>
                          When you&apos;re ready to record, press the Record
                          button, then press the Stop button to finish. Try to
                          keep your recording to around 1 minute in length.
                        </Typography>
                        <Typography variant="caption" paragraph>
                          If you want to re-record your memory, stop the
                          recording then press Record Again.
                        </Typography>
                        <RecorderButton
                          onReset={onReset}
                          onRecorded={onRecorded}
                        />
                      </Grid>
                    )}
                    {!!audioSrc && (
                      <Form
                        audioSrc={audioSrc}
                        audioType={audioType}
                        onRecord={onReset}
                        onSubmit={onSave}
                      />
                    )}
                  </>
                )}
                {saved && (
                  <Grid item xs={12}>
                    <Typography variant="body2" paragraph>
                      We will now process your recording before adding it to the
                      map, and we&apos;ll send you an email when your memory has
                      been published.
                    </Typography>
                    <Button fullWidth variant="outlined" onClick={onReset}>
                      Record another
                    </Button>
                  </Grid>
                )}
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button disabled={saving} onClick={onClose}>
              {audioSrc && !saved ? 'Cancel' : 'Close'}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

Recorder.displayName = 'ContributeRecorder';
Recorder.propTypes = { intro: bool, size: string, open: bool };

export default Recorder;
