import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Box from '@mui/material/Box';
import { func } from 'prop-types';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Circle from '@mui/icons-material/Circle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const RecorderButton = ({ onReset, onRecorded }) => {
  const dispatch = useDispatch();
  const startTime = useRef(null);
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState('0:00');
  const recorder = useRef(null);

  const isSupported = useMemo(() => !!global?.navigator?.mediaDevices, []);

  const onRecord = async () => {
    onReset();
    setRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder.current = new MediaRecorder(stream);
      recorder.current.ondataavailable = (e) => {
        onRecorded(e.data);
      };
      recorder.current.start();
    } catch (err) {
      setRecording(false);
      dispatch({ type: 'addMessage', payload: err.message });
    }
  };

  const onStop = () => {
    setRecording(false);
    recorder.current.stop();
  };

  const updateDuration = useCallback(
    (time, next) => {
      if (recording) {
        if (time === false) {
          startTime.current = 0;
        } else {
          if (startTime.current === 0) {
            startTime.current = time;
            setDuration('0:00');
          } else {
            const diff = time - startTime.current;
            const seconds = Math.floor(diff / 1000);
            const s = seconds % 60;
            const m = Math.floor((seconds - s) / 60);
            setDuration(`${m}:${`${s}`.padStart(2, '0')}`);
          }
        }
        window.requestAnimationFrame((t) => next(t, next));
      }
    },
    [recording, setDuration],
  );

  useEffect(() => {
    if (recording) updateDuration(false, updateDuration);
  }, [recording, updateDuration]);

  if (!isSupported)
    return (
      <Box>
        Sorry, your device cannot record audio for this project. Please use
        another device to record your memory.
      </Box>
    );

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Grid
        alignItems="center"
        justifyContent="center"
        container
        spacing={1}
        wrap="nowrap"
      >
        <Grid item>
          <Button
            startIcon={
              <Circle
                sx={{
                  '@keyframes blinking': {
                    '50%': {
                      opacity: 0,
                    },
                  },
                  color: 'error.main',
                  animation: recording
                    ? 'blinking 1s step-start infinite'
                    : 'none',
                }}
              />
            }
            onClick={onRecord}
            variant="contained"
            color="primary"
            disabled={recording}
          >
            Record
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={onStop}
            variant="contained"
            color="secondary"
            disabled={!recording}
          >
            Stop
          </Button>
        </Grid>
        <Grid item>
          <Typography
            color="text.secondary"
            variant="body1"
            sx={{ ml: 2, fontFamily: 'monospace' }}
          >
            {duration}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

RecorderButton.displayName = 'ContributeRecorderButton';
RecorderButton.propTypes = { onReset: func, onRecorded: func };

export default RecorderButton;
