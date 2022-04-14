import React from 'react';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { bool } from 'prop-types';
import Headphones from '@mui/icons-material/Headphones';
import Divider from '@mui/material/Divider';

import TnlLogo from './Logos/TnlLogo';
import Logo from './Logo';

const About = ({ active }) => {
  return (
    <Collapse in={active}>
      <Box
        sx={{
          textAlign: 'center',
          bgcolor: 'primary.main',
          color: 'rgba(255,255,255,0.87)',
          p: 2,
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            width: '80%',
            position: 'relative',
            aspectRatio: '240 / 128',
            my: 2,
          }}
        >
          <Logo variant="full" layout="fill" />
        </Box>
        <Typography
          sx={{
            position: 'relative',
            top: -24,
            color: 'secondary.light',
          }}
          variant="h5"
        >
          Memories
        </Typography>
        <Divider sx={{ borderColor: 'secondary.main', mb: 2 }} />
        <Box
          sx={{
            color: 'secondary.light',
            display: 'block',
            textAlign: 'center',
          }}
        >
          <Headphones color="inherit" fontSize="large" />
        </Box>
        <Typography
          variant="button"
          sx={{ mb: 2, display: 'block' }}
          color="secondary.light"
        >
          Best with headphones
        </Typography>
        <Divider sx={{ borderColor: 'secondary.main', mb: 2 }} />
        <Typography variant="body1" paragraph>
          Use this app to explore local history and listen to members of the
          community recount memories of Diglis.
        </Typography>
        <Typography variant="body2" paragraph>
          Walk the fields, explore the nature reserve, and stroll along the
          basin and riverside while memories fade and blend as you walk through
          the marked areas on the map.
        </Typography>
        <Divider sx={{ borderColor: 'secondary.main', mb: 2 }} />
        <TnlLogo sx={{ fontSize: 164, height: 54, opacity: 0.87, mb: 4 }} />
      </Box>
    </Collapse>
  );
};

About.displayName = 'About';
About.propTypes = {
  active: bool,
};

export default About;
