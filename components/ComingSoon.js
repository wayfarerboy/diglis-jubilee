import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Footer from './Pages/Footer';
import Link from './Link';
import LogoTitle from './LogoTitle';
import { darkTheme } from '../helpers/theme';
import AppWrapper from './AppWrapper';
import { globalStylesDark } from '../helpers/styles';

const ComingSoon = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      {globalStylesDark}
      <AppWrapper
        title="Diglis Jubilee: Memories"
        description="Explore Diglis and hear historical accounts from our community"
        dark
      />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="xs" sx={{ pt: 15, color: 'text.primary' }}>
          <LogoTitle spacing={0}>
            <Typography
              variant="h5"
              paragraph
              color="secondary"
              sx={{ textTransform: 'uppercase', mt: 4 }}
            >
              Coming soon
            </Typography>
            <Typography variant="body1" paragraph>
              Do you have a memory you&apos;d like to share?
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              Our digital history project aims to record the community&apos;s
              memories of Diglis, both written and spoken, as a place to live or
              work, or as a place of recreation, in recent times or times long
              past.
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              We&apos;ll pin each memory onto a digital map, and then present
              the map on the day of the jubilee as both a virtual tour guide for
              Diglis and an archive of our shared history.
            </Typography>
            <Typography variant="body2" paragraph sx={{ mb: 4 }}>
              If you have any memories you&apos;d like to submit, please send
              them to us.
            </Typography>
            <Link
              href="mailto:memories@diglisjubilee.co.uk?subject=My memory of Diglis"
              size="large"
              color="secondary"
              component={Button}
              variant="outlined"
              target="_blank"
              fullWidth
              sx={{ whiteSpace: 'nowrap' }}
            >
              Send us a memory of Diglis
            </Link>
            <Footer dark sx={{ border: 0 }} />
          </LogoTitle>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

ComingSoon.displayName = 'ComingSoon';

export default ComingSoon;
