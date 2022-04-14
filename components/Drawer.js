import React from 'react';
import Box from '@mui/material/Box';
import { object } from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { useSelector, useDispatch } from 'react-redux';

import Nearby from './List/Nearby';
import About from './About';
import Help from './Help';

const tabs = [
  { value: 'about', label: 'About' },
  { value: 'nearby', label: 'Playlist' },
  { value: 'help', label: 'Help' },
];

const Drawer = ({ onView, map, data, sx }) => {
  const dispatch = useDispatch();
  const activeMode = useSelector(({ app }) => app.drawer) || false;
  const onToggle = (mode) => () => {
    dispatch({
      type: 'setAppDrawer',
      payload: activeMode === mode ? null : mode,
    });
  };

  return (
    <Box sx={sx}>
      <Paper
        elevation={10}
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          overflowY: 'auto',
          width: '100%',
        }}
      >
        <List disablePadding>
          <ListSubheader disableGutters>
            <Tabs variant="fullWidth" value={activeMode}>
              {tabs.map(({ label, value }) => (
                <Tab
                  key={value}
                  onClick={onToggle(value)}
                  value={value}
                  label={label}
                />
              ))}
            </Tabs>
          </ListSubheader>
          <About active={activeMode === 'about'} />
          <Nearby
            active={activeMode === 'nearby'}
            data={data}
            onView={onView}
            map={map}
          />
          <Help active={activeMode === 'help'} />
        </List>
      </Paper>
    </Box>
  );
};

Drawer.displayName = 'Drawer';
Drawer.propTypes = {
  sx: object,
};

export default Drawer;
