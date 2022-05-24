import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { func } from 'prop-types';

const Intro = ({ onNext }) => {
  return (
    <>
      {/*<Box sx={{ textAlign: 'center' }}>
        <Box
          component="iframe"
          src="https://player.cloudinary.com/embed/?public_id=diglisjubilee%2FDiglis_Juilee_memories_trailer&cloud_name=generamics&player%5Bfluid%5D=true&player%5Bcontrols%5D=true&player%5BposterOptions%5D%5Btransformation%5D%5BstartOffset%5D=13&source%5BsourceTypes%5D%5B0%5D=mp4"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          frameBorder="0"
          sx={{
            aspectRatio: '16 / 9',
            width: 280,
            mb: 2,
          }}
        />
      </Box>*/}
      <Typography variant="body1" paragraph>
        You can contribute to the project <strong>right now</strong> by using
        our quick and easy voice recorder!
      </Typography>
      <Typography variant="body2" paragraph>
        You&apos;ll record about 1 minute talking about a memory from your time
        in Diglis. Don&apos;t worry about how interesting or how recent it might
        be. We want this project to reflect the personal experiences of the
        people who live, work and visit here, so there are no wrong answers!
      </Typography>
      <Typography variant="body2" paragraph>
        If you have more than one memory of Diglis, feel free to submit as many
        as you like. Oh, and <strong>thanks so much</strong> for getting
        involved!
      </Typography>
      <Button fullWidth size="large" variant="contained" onClick={onNext}>
        Get started
      </Button>
    </>
  );
};

Intro.displayName = 'Contribute';
Intro.propTypes = { onNext: func };

export default Intro;
