import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { object, bool, string } from 'prop-types';
import { useTheme } from '@mui/material/styles';

const TrackTitle = ({ animation, sx = {}, text = '' }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const theme = useTheme();
  const duration = text.length * 200;
  const pause = 2000;
  const total = duration + pause;

  useEffect(() => {
    if (animation !== false && ref.current) {
      const child = ref.current.offsetWidth;
      const parent = ref.current.parentElement.parentElement.offsetWidth;
      setActive(child > parent);
    }
  }, [setActive, ref.current]);

  if (!text) return null;

  return (
    <Typography
      sx={{
        width: '100%',
        overflowX: 'hidden',
        position: 'relative',
        ...sx,
      }}
      variant="inherit"
      component="div"
    >
      <Box
        sx={{
          whiteSpace: 'nowrap',
          display: 'inline-block',
          '@keyframes slideshow': {
            '0%': { transform: 'translateX(0)' },
            [`${(pause / total) * 100}%`]: { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
          ...(active
            ? {
                animation: `slideshow ${total}ms cubic-bezier(0.4, 0.2, 0.6, 0.8) infinite`,
              }
            : {}),
        }}
      >
        <Box
          ref={ref}
          sx={{
            pr: active ? 8 : 0,
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </Box>
        {active && (
          <Box sx={{ pr: 8, display: 'inline-block', whiteSpace: 'nowrap' }}>
            {text}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          height: '100%',
          width: 32,
          backgroundImage: `linear-gradient(90deg, transparent, ${theme.palette.background.default})`,
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      />
    </Typography>
  );
};

TrackTitle.displayName = 'Player/TrackTitle';
TrackTitle.propTypes = {
  text: string,
  sx: object,
  animation: bool,
};

export default TrackTitle;
