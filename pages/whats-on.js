import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';

import DogShow from '../components/Pages/DogShow';
import Footer from '../components/Pages/Footer';
import { darkTheme } from '../helpers/theme';
import WhatsOn from '../components/Pages/WhatsOn';
import { globalStylesDark } from '../helpers/styles';
import Activities from '../components/Pages/Activities';
import AppWrapper from '../components/AppWrapper';

const Component = () => (
  <ThemeProvider theme={darkTheme}>
    {globalStylesDark}
    <AppWrapper
      title="Diglis Jubilee: What's On"
      description="The full rundown of the day's events, along with links to all artists and exhibitors"
      dark
    />
    <Box
      sx={{
        borderBottom: `24px solid #68996D`,
        borderColor: 'secondary.light',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          color="primary.main"
          sx={{ textAlign: { xs: 'left', sm: 'center' }, mt: 10, mb: 2 }}
        >
          What&apos;s On
        </Typography>

        <Box
          sx={{
            mb: 2,
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '5fr 4fr' },
            gap: 2,
          }}
        >
          <Typography variant="h5">
            <WhatsOn />
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{ mt: { xs: 0, sm: 3 } }}
          >
            <DogShow />
          </Typography>
        </Box>
        <Box sx={{ mt: 4, textAlign: { xs: 'left', sm: 'center' }, mb: 10 }}>
          <Activities sx={{ fontWeight: 300, typography: 'body1' }} />
        </Box>
      </Container>
    </Box>
    <Footer dark />
  </ThemeProvider>
);

export default Component;
