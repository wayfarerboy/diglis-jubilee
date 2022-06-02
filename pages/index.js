import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';

import { darkTheme } from '../helpers/theme';
import Footer from '../components/Pages/Footer';
import Link from '../components/Link';
import Logo from '../components/Logo';
import AppWrapper from '../components/AppWrapper';
import { globalStylesDark } from '../helpers/styles';

const Home = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      {globalStylesDark}
      <AppWrapper
        title="Diglis Jubilee"
        dark
        description="A community celebration held on the Sunday of the Platinum Jubilee 2022, in Diglis, Worcester, UK"
      />
      <Box
        sx={{
          borderBottom: `24px solid #68996D`,
          borderColor: 'secondary.light',
        }}
      >
        <Box
          sx={{
            mx: 'auto',
            width: 320,
            maxWidth: 'calc(100% - 32px)',
            minWidth: '50vw',
            textAlign: 'center',
            py: { xs: 10, sm: 20 },
          }}
        >
          <Logo variant="full" />
          <Typography
            sx={{ color: 'text.secondary', mb: 6, mt: 2 }}
            variant="h6"
          >
            <>
              On Sunday 5th June, to coincide with the Queen&apos;s Platinum
              Jubilee, we&apos;re inviting the community to bring a picnic and
              join us on{' '}
              <Link
                component={Button}
                external
                href="https://goo.gl/maps/mWLkpeTU4Xx5CC3s5"
                target="_blank"
                variant="outlined"
                color="inherit"
                sx={{
                  fontWeight: 700,
                  borderColor: 'currentColor',
                  color: 'inherit',
                  mx: 1,
                }}
              >
                Diglis Fields
              </Link>{' '}
              to celebrate Diglis past, present and future.
            </>
          </Typography>
          <Typography color="primary.light" variant="caption" paragraph>
            Quick links
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
              gap: 2,
            }}
          >
            <Link
              component={Button}
              href="/whats-on"
              color="primary"
              variant="outlined"
              size="large"
            >
              What&apos;s on
            </Link>
            <Link
              component={Button}
              href="/map"
              color="inherit"
              variant="outlined"
              size="large"
              sx={{
                color: 'secondary.light',
                borderColor: 'secondary.light',
              }}
            >
              Event map
            </Link>
            <Link
              component={Button}
              href="/memories"
              color="inherit"
              variant="outlined"
              size="large"
              sx={{
                color: 'text.primary',
                borderColor: 'text.primary',
              }}
            >
              Memories
            </Link>
          </Box>
        </Box>
      </Box>

      <Footer dark />
    </ThemeProvider>
  );
};

export default Home;
