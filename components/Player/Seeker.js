import React, { useEffect, useRef, useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { object, number } from 'prop-types';

import { humanTime } from '../../helpers/playback';

const defaultMarks = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
];

const Seeker = ({
  sx = {},
  audio,
  duration: _duration,
  currentTime: _currentTime,
  sliderTiem: _sliderTime,
}) => {
  const frame = useRef(null);

  const duration = audio?.duration() || _duration || 0;
  const [currentTime, setCurrentTime] = useState(_currentTime || 0);
  const [sliderTime, setSliderTime] = useState(_sliderTime || -1);

  const onUpdate = (next) => {
    if (audio) {
      setCurrentTime(audio.seek());
      frame.current = window.requestAnimationFrame(() => next(next));
    }
  };

  const onChange = (_, val) => setSliderTime(val);

  const onChangeCommitted = (_, val) => {
    if (audio) {
      audio.seek(val);
      setSliderTime(-1);
    }
  };

  let marks = defaultMarks;
  if (duration)
    marks = [
      { value: 0, label: humanTime(currentTime) },
      { value: duration, label: humanTime(duration) },
    ];

  const value = sliderTime > -1 ? sliderTime : currentTime;

  useEffect(() => {
    if (audio) onUpdate(onUpdate);
    return () => window.cancelAnimationFrame(frame.current);
  }, [audio]);

  return (
    <Box sx={{ ...sx, position: 'relative' }}>
      <Slider
        size="small"
        value={value}
        min={0}
        max={duration}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
        marks={marks}
        sx={{
          opacity: duration ? 1 : 0,
          '.MuiSlider-markLabel': {
            typography: 'caption',
            pr: 2.5,
            mt: -1,
          },
          '.MuiSlider-markLabelActive': {
            pl: 3.25,
            pr: 0,
          },
        }}
      />
      <LinearProgress
        sx={{
          opacity: duration ? 0 : 1,
          width: '100%',
          position: 'absolute',
          top: 12,
          height: 2,
        }}
        value={audio ? null : 0}
        variant={audio ? 'indeterminate' : 'determinate'}
      />
    </Box>
  );
};

Seeker.displayName = 'PlayerSeeker';
Seeker.propTypes = {
  sx: object,
  audio: object,
  sliderTime: number,
  currentTime: number,
  duration: number,
};

export default Seeker;
