import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Info from '@mui/icons-material/Info';
import { bool } from 'prop-types';

const Help = ({ active }) => {
  return (
    <Collapse in={active}>
      <Box sx={{ p: 2, bgcolor: 'secondary.light' }}>
        <Typography variant="h5">How to use this app</Typography>
        <Divider sx={{ borderColor: 'primary.main', mb: 2 }} />
        <Typography variant="body1" paragraph>
          This app is best experienced on your mobile phone, ideally with
          headphones, and used when you are in the Diglis area of Worcester, UK.
          It uses your live location to present memories of specific areas that
          are closest to you.
        </Typography>
        <Typography variant="body2" paragraph>
          The Track panel shows your currently playing memory and the Map panel
          shows where it is pinned.
        </Typography>
        <Typography paragraph variant="body2">
          Pressing the <Info fontSize="small" /> button displays more
          information about the memory.
        </Typography>
        <Typography variant="body1" paragraph>
          If you use the app from a desktop or laptop computer, or are not
          currently in the Diglis area, you can still explore the memories by
          selecting them from the map or playlist.
        </Typography>
      </Box>
    </Collapse>
  );
};

Help.displayName = 'Help';
Help.propTypes = {
  active: bool,
};

export default Help;
