import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import cookies from 'js-cookie';

import Link from './Link';

const Cookies = () => {
  const [active, setActive] = useState(false);
  const [responded, setResponded] = useState(false);

  const onAccept = () => {
    cookies.set('cc_cookiesAllowed', true);
    window[`ga-disable-${process.env.NEXT_PUBLIC_ANALYTICS_ID}`] = false;
    setResponded(true);
    setActive(false);
  };

  const onDecline = () => {
    cookies.set('cc_cookiesAllowed', false);
    setResponded(true);
    setActive(false);
  };

  useEffect(() => {
    if (global.window) {
      window[`ga-disable-${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID}`] =
        cookies.get('cc_cookiesAllowed') !== 'true';
    }
    setActive(!responded && !cookies.get('cc_cookiesAllowed'));
  }, []);

  const policyUrl = `/cookies`;

  const sx = { display: { xs: 'none', md: 'inherit' } };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        pointerEvents: 'none',
      }}
    >
      <Slide in={active} direction="up">
        <Paper elevation={10} square sx={{ pointerEvents: 'auto' }}>
          <Grid spacing={2} container alignItems="center" sx={{ px: 2, pb: 3 }}>
            <Grid item md={1} sx={sx}>
              &nbsp;
            </Grid>
            <Grid item xs={12} sm>
              <Typography variant="body2">
                We use cookies to feed back visitor numbers to our funders which
                helps fund future community projects such as this one. Please
                either accept or decline{' '}
                <Link href={policyUrl}>our cookie policy</Link>.
              </Typography>
            </Grid>
            <Grid item xs={6} sm="auto">
              <Button
                variant="contained"
                fullWidth
                size="small"
                onClick={onAccept}
              >
                Accept
              </Button>
            </Grid>
            <Grid item xs={6} sm="auto">
              <Button
                variant="contained"
                fullWidth
                color="inherit"
                size="small"
                onClick={onDecline}
              >
                Decline
              </Button>
            </Grid>
            <Grid item md={1} sx={sx}>
              &nbsp;
            </Grid>
          </Grid>
        </Paper>
      </Slide>
    </Box>
  );
};

Cookies.displayName = 'PoliciesCookies';

export default Cookies;
