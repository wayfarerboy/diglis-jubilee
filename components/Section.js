import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { any, bool } from 'prop-types';

const Section = ({ children, active }) => (
  <Box
    sx={{
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      pointerEvents: active ? 'auto' : 'none',
    }}
  >
    <Fade in={active}>
      <Box sx={{ width: '100%', height: '100%' }}>{children}</Box>
    </Fade>
  </Box>
);

Section.propTypes = {
  children: any,
  active: bool,
};

export default Section;
