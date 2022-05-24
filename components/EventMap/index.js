import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import AppWrapper from '../AppWrapper';

const Component = () => {
  const [active, setActive] = useState(false);
  const [dims, setDims] = useState({});

  const onSetDims = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setDims({ width: w, height: h });
  };

  const onSetOffset = (transform) => {
    if (!Object.keys(dims).length && transform) {
      onSetDims();
    }
  };

  useEffect(() => {
    if (!active && global.window) {
      const img = document.createElement('img');
      img.onload = () => setActive(true);
      img.src = '/map.jpg';
    }
  }, [active, setActive]);

  useEffect(() => {
    if (global.window) {
      let tmout;
      const func = () => {
        clearTimeout(tmout);
        tmout = setTimeout(() => onSetDims(), 50);
      };
      window.addEventListener('resize', func);
      return () => window.removeEventListener('resize', func);
    }
  }, [onSetDims]);

  return (
    <Box
      sx={{
        position: 'fixed',
        bgcolor: 'primary.dark',
        width: '100%',
        height: '100%',
        '&:before': {
          position: 'fixed',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          backgroundImage: 'url(/map.jpg)',
          backdropFilter: 'blur(5px) opacity(0.5)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
          display: 'block',
          filter: 'blur(10px)',
          opacity: active ? 0.3 : 0,
          transition: 'opacity 0.5s ease-in-out',
          content: '""',
        },
        '.react-transform-wrapper': {
          overflow: 'visible',
        },
      }}
    >
      <AppWrapper title="Diglis Jubilee: Event map" description="" />
      <TransformWrapper ref={onSetOffset} maxScale={2.5}>
        <TransformComponent>
          <Box
            sx={{
              lineHeight: 0,
              backgroundImage: 'url(/map.jpg)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundColor: 'transparent',
              backgroundOrigin: 'content-box',
              opacity: active ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
              py: 4,
              ...dims,
            }}
          />
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};

Component.displayName = 'EventMap';

export default Component;
