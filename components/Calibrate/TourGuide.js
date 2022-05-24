import React, { useState } from 'react';
import { func } from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Refresh from '@mui/icons-material/Refresh';

import BackButton from './BackButton';
import Link from '../Link';
import useLocalStorage from '../../hooks/useLocalStorage';
import Introduction from './Introduction';
import { modes } from '../../helpers/modes';

const helpLink = (platform) =>
  `https://support.google.com/websearch/answer/179386?hl=en&co=GENIE.Platform%3D${platform}#:~:text=Manage%20location%20permissions-,For%20a%20website`;

const TourGuide = ({ onReady, onSwitch }) => {
  const dispatch = useDispatch();
  const [inited, setInited] = useState(false);
  const [status, setAccess] = useLocalStorage('locationAccess', 'initing');
  const [found, setFound] = useState(false);
  const isIos = useSelector(({ app }) => app.isIos);

  const onSuccess = () => {
    console.log('Success');
    setAccess('allowed');
    setFound(true);
  };

  const onDenied = () => setAccess('denied');

  const onError = (err) => {
    console.log(err);
    if (err.code !== 1 && err.code !== 3) {
      dispatch({
        type: 'addMessage',
        payload: err.message || err,
        severity: 'error',
        duration: 6000,
      });
    }
    onDenied();
  };

  const onStart = () => {
    setInited(true);
    if ('geolocation' in navigator) {
      setFound(false);
      if (status !== 'allowed') setAccess('requesting');
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        maximumAge: 60,
        timeout: 20000,
      });
    } else {
      setAccess('denied');
    }
  };

  return (
    <>
      <Typography variant="body1" paragraph>
        This mode requires access to your location to enable auto-play features.
      </Typography>
      <Typography variant="caption" paragraph sx={{ mb: 6 }}>
        You can still switch to {modes.closest.label} to manually play tracks.
      </Typography>
      {inited && status === 'denied' && (
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
          <Grid item>
            <Alert severity="error" variant="outlined">
              <AlertTitle>Unable to access location</AlertTitle>
              To find out how to enable location access for your device,{' '}
              <Link href={helpLink(isIos ? 'iOS' : 'Android')} target="_blank">
                click here
              </Link>
              .
            </Alert>
          </Grid>
          <Grid item>
            <Button
              startIcon={<Refresh />}
              onClick={onStart}
              variant="outlined"
              color="secondary"
            >
              Retry share location
            </Button>
          </Grid>
        </Grid>
      )}
      {(!inited || status === 'initing') && (
        <Button
          fullWidth
          size="large"
          variant="outlined"
          color="secondary"
          sx={{ mb: 2 }}
          onClick={onStart}
        >
          Share my location
        </Button>
      )}
      {inited && status !== 'initing' && status !== 'denied' && (
        <>
          <Typography
            sx={{
              display: 'block',
              textAlign: 'center',
              color: 'primary.light',
            }}
            variant="h6"
            paragraph
          >
            {found ? 'Location found' : 'Pinpointing your location...'}
          </Typography>
          {!found && <LinearProgress />}
        </>
      )}
      {status === 'allowed' && found && <Introduction onReady={onReady} />}
      <BackButton onClick={onSwitch} />
    </>
  );
};

TourGuide.displayName = 'CalibrateTourGuide';
TourGuide.propTypes = {
  onReady: func,
  onSwitch: func,
};

export default TourGuide;
