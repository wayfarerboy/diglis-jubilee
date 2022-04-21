import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { any } from 'prop-types';
import Fade from '@mui/material/Fade';

const Backdrop = ({ target }) => {
  const [active, setActive] = useState(false);
  const [coords, setCoords] = useState();

  useEffect(() => {
    if (target) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const { x, y, width, height } = target.getBoundingClientRect();
      const newCoords = {
        x: (x / w) * 100,
        y: (y / h) * 100,
        width: (width / w) * 100,
        height: (height / h) * 100,
      };
      console.log({ newCoords, w, h, x, y, width, height });
      setCoords(newCoords);
      setActive(true);
    } else {
      setActive(false);
    }
  }, [target]);

  return (
    <Box
      sx={{
        svg: {
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 'tooltip',
          width: '100%',
          height: '100%',
          isolation: 'isolate',
          // pointerEvents: 'none',
        },
      }}
    >
      <Fade in={active}>
        <div>
          {coords && (
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d={` M 0 0 L 100 0 L 100 100 L 0 100 L 0 0 Z  M ${coords.x} ${
                  coords.y
                } L ${coords.x + coords.width} ${coords.y} L ${
                  coords.x + coords.width
                } ${coords.y + coords.height} L ${coords.x} ${
                  coords.y + coords.height
                } L ${coords.x} ${coords.y} Z `}
                fillRule="evenodd"
                fill="rgba(0,0,0,0.44)"
              />
            </svg>
          )}
        </div>
      </Fade>
    </Box>
  );
};

Backdrop.displayName = 'OnboardingBackdrop';
Backdrop.propTypes = {
  target: any,
};

export default Backdrop;
