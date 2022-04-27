import React from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

import { object } from 'prop-types';

const Switcher = ({ sx = {} }) => {
  const dispatch = useDispatch();
  const mode = useSelector(({ map }) => map.mode);
  const active = useSelector(
    ({ app, map }) => !(app.drawer || map.detailsOpen),
  );

  const onToggle = (ev, payload) => {
    if (payload) dispatch({ type: 'setMapMode', payload });
  };

  return (
    <Box sx={{ ...sx }}>
      <Collapse in={active}>
        <Box sx={{ width: '100%', textAlign: 'center', pt: 0, pb: 2 }}>
          <ToggleButtonGroup
            value={mode}
            onChange={onToggle}
            size="small"
            exclusive
            color="primary"
            data-help="switcher"
            sx={{
              boxShadow: 3,
              borderRadius: 16,
              '.MuiToggleButton-root': { fontSize: 12, py: 0.4, px: 1 },
            }}
          >
            <ToggleButton
              sx={{
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
              }}
              value="track"
            >
              Player
            </ToggleButton>
            <ToggleButton
              sx={{
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
              }}
              value="map"
            >
              Map
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Collapse>
    </Box>
  );
};

Switcher.displayName = 'PlayerSwitcher';
Switcher.propTypes = {
  sx: object,
};

export default Switcher;
