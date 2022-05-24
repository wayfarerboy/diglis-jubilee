import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { func, any } from 'prop-types';

const Backdrop = ({ onClick, target }) => {
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
      setCoords(newCoords);
      setActive(true);
    } else {
      setActive(false);
    }
  }, [target]);

  return (
    <Box
      onClick={onClick}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: active ? 1 : 0,
        transition: 'opacity .3s ease-in-out',
        svg: {
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          isolation: 'isolate',
        },
      }}
    >
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
    </Box>
  );
};

Backdrop.displayName = 'OnboardingBackdrop';
Backdrop.propTypes = {
  target: any,
  onClick: func,
};

export default Backdrop;
