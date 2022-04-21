import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Navigation from '@mui/icons-material/Navigation';
import ButtonBase from '@mui/material/ButtonBase';
import { oneOf, number, func, shape, object } from 'prop-types';

const Compass = ({
  size,
  bearing = 0,
  distance,
  sx,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Grid item sx={sx} data-help="navigation">
      <Grid
        component={onClick ? ButtonBase : 'div'}
        {...(onClick
          ? {
              onClick,
              onMouseEnter,
              onMouseLeave,
            }
          : {})}
        container
        direction="column"
        alignItems="center"
      >
        <Navigation
          sx={{
            color: 'text.secondary',
            fontSize: size === 'small' ? 24 : 32,
            transform: `rotate(${bearing}deg)`,
          }}
        />
        <Typography
          component={Grid}
          item
          variant="caption"
          sx={{ textTransform: 'lowercase' }}
        >
          {distance}
        </Typography>
      </Grid>
    </Grid>
  );
};

Compass.displayName = 'PlayerCompass';
Compass.propTypes = {
  latlng: shape({
    lat: number,
    lng: number,
    distanceTo: func,
  }),
  sx: object,
  size: oneOf(['medium', 'small']),
  onClick: func,
  onMouseEnter: func,
  onMouseLeave: func,
};

export default Compass;
