import React, { useCallback, useState } from 'react';
import { func } from 'prop-types';
import { useMap } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import Explore from '@mui/icons-material/Explore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Introduction from './Introduction';
import AppWrapper from './AppWrapper';
import useBounds from '../hooks/useBounds';
import useData from '../hooks/useData';
import useLocalStorage from '../hooks/useLocalStorage';
import { darkTheme } from '../helpers/theme';
import LogoTitle from './LogoTitle';
import Wrapper from './Map/Wrapper';
import useLocate from '../hooks/useLocate';

const helpLink = (platform) =>
  `https://support.google.com/websearch/answer/179386?hl=en&co=GENIE.Platform%3D${platform}#:~:text=Manage%20location%20permissions-,For%20a%20website`;

const Calibrate = ({ onOutOfBounds, onDenied, onError: error, onLocation }) => {
  const map = useMap();

  const onError = (err) => {
    console.log(err);
    if (err.code === -1) {
      onOutOfBounds();
    } else if (err.code === 1) {
      onDenied();
    } else {
      error?.(err);
    }
  };

  useLocate({ map, onError, onLocation });

  return null;
};

const Component = ({ onReady }) => {
  const dispatch = useDispatch();
  const data = useData();
  const bounds = useBounds({ data, pad: 1.5 });
  const [status, setAccess] = useLocalStorage('locationAccess', 'initing');
  const [skip, setSkip] = useLocalStorage('skipIntro', false);
  const latlng = useSelector(({ geolocation }) => geolocation.latlng);
  const [outOfBounds, setOutOfBounds] = useState(false);
  const isIos = useSelector(({ app }) => app.isIos);

  const onShare = () => setAccess('requesting');
  const onOutOfBounds = () => setOutOfBounds(true);
  const onDenied = () => setAccess('denied');

  const onToggleSkip = () => setSkip(!skip);

  const onContinue = (_status) => () => {
    const s = _status || status;
    if (s === 'denied') dispatch({ type: 'setLocationDenied' });
    const mode = s === 'denied' || outOfBounds ? 'closest' : 'moving';
    dispatch({
      type: 'setPlaybackMode',
      payload: mode,
    });
    if (mode === 'moving')
      dispatch({
        type: 'setMapMode',
        payload: 'map',
      });
    onReady();
  };

  const onLocation = useCallback(
    (ll) => {
      setOutOfBounds(!bounds.contains(ll));
      setAccess('allowed');
      if (skip) onContinue('allowed')();
    },
    [skip],
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <AppWrapper
        title="Diglis Jubilee: Memories"
        description="Explore Diglis and hear historical accounts from our community"
        dark
      />
      <Wrapper
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          color: 'primary.main',
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          '.leaflet-container': {
            display: 'none',
          },
        }}
        footer={
          <Container maxWidth="xs">
            {!status && (
              <LogoTitle dark progress spacing={0}>
                Loading...
              </LogoTitle>
            )}
            {['initing', 'denied'].includes(status) && (
              <LogoTitle dark spacing={0}>
                <Box sx={{ color: 'text.primary', mt: 2 }}>
                  <Typography variant="body2" paragraph>
                    In order to experience Diglis Jubilee memories as intended,
                    we recommend you view this page while in the{' '}
                    <Link
                      href="https://goo.gl/maps/zhXqHRQMs3WuajED7"
                      target="_blank"
                      color="secondary"
                    >
                      Diglis area
                    </Link>{' '}
                    and that you grant access to your location to enable the
                    tour guide features.
                  </Typography>
                  <Typography variant="caption" paragraph>
                    You can still browse the page if you do not grant access,
                    but the tour guide features will be disabled.
                  </Typography>
                  {status === 'denied' && (
                    <Grid
                      container
                      spacing={2}
                      justifyContent="center"
                      sx={{ mb: 2 }}
                    >
                      <Grid item>
                        <Button
                          href={helpLink(isIos ? 'iOS' : 'Android')}
                          variant="outlined"
                          color="primary"
                          target="_blank"
                          sx={{
                            color: 'primary.light',
                            borderColor: 'primary.light',
                          }}
                        >
                          How to grant access
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={onShare}
                          variant="outlined"
                          color="secondary"
                        >
                          Retry access
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                  {status === 'initing' && (
                    <Button
                      fullWidth
                      size="large"
                      variant="outlined"
                      color="secondary"
                      sx={{ mb: 2 }}
                      onClick={onShare}
                    >
                      Share my location
                    </Button>
                  )}
                  <Button
                    onClick={onContinue('denied')}
                    size="small"
                    color="inherit"
                  >
                    Continue without location
                  </Button>
                </Box>
              </LogoTitle>
            )}
            {(status === 'requesting' || (status === 'allowed' && !latlng)) && (
              <LogoTitle dark progress>
                Pinpointing your location...
              </LogoTitle>
            )}
            {status === 'allowed' && !!latlng && (
              <LogoTitle dark>
                <Typography
                  sx={{ color: 'primary.light' }}
                  variant="h6"
                  paragraph
                >
                  Location found
                </Typography>
                {outOfBounds ? (
                  <>
                    <Typography variant="body2" color="textPrimary" paragraph>
                      You are outside the boundaries of this project, so the
                      memories player will now run in{' '}
                      <Typography
                        color="primary"
                        variant="button"
                        component="span"
                      >
                        <Explore
                          fontSize="small"
                          sx={{ ml: 0.5, position: 'relative', top: 4 }}
                        />{' '}
                        Explore
                      </Typography>{' '}
                      mode where you can manually choose the memories you wish
                      to listen to.
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      paragraph
                    >
                      You can at any point switch to{' '}
                      <Typography
                        color="primary"
                        variant="button"
                        component="span"
                      >
                        <AutoAwesome
                          fontSize="small"
                          sx={{ ml: 0.5, position: 'relative', top: 4 }}
                        />{' '}
                        Tour Guide
                      </Typography>{' '}
                      mode and the player will play memories whenever you are
                      near points on the map.
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography variant="body2" color="textPrimary" paragraph>
                      The memories player will now run in{' '}
                      <Typography
                        color="primary"
                        variant="button"
                        component="span"
                      >
                        <AutoAwesome
                          fontSize="small"
                          sx={{ ml: 0.5, position: 'relative', top: 4 }}
                        />{' '}
                        Tour Guide
                      </Typography>{' '}
                      mode, playing memories whenever you are near points on the
                      map.
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      paragraph
                    >
                      You can switch to{' '}
                      <Typography
                        color="primary"
                        variant="button"
                        component="span"
                      >
                        <Explore
                          fontSize="small"
                          sx={{ ml: 0.5, position: 'relative', top: 4 }}
                        />{' '}
                        Explore
                      </Typography>{' '}
                      mode at any time to play any memory manually.
                    </Typography>
                  </>
                )}
                <Introduction
                  onClick={onContinue()}
                  fullWidth
                  size="large"
                  variant="contained"
                >
                  Play introduction
                </Introduction>
                <FormControlLabel
                  label="Skip this step next time"
                  sx={{
                    px: 1.75,
                    py: 0.75,
                    '& .MuiFormControlLabel-label': {
                      typography: 'caption',
                      lineHeight: 1.1,
                      color: 'text.primary',
                    },
                  }}
                  control={
                    <Checkbox
                      name="skip"
                      checked={skip}
                      onChange={onToggleSkip}
                      size="small"
                    />
                  }
                />
                <Button
                  onClick={onContinue()}
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: 'primary.light', color: 'primary.light' }}
                >
                  Continue without introduction
                </Button>
              </LogoTitle>
            )}
          </Container>
        }
      >
        {(status === 'requesting' || (status === 'allowed' && !latlng)) &&
          typeof skip === 'boolean' && (
            <Calibrate
              onReady={onReady}
              onOutOfBounds={onOutOfBounds}
              onDenied={onDenied}
              onLocation={onLocation}
            />
          )}
      </Wrapper>
    </ThemeProvider>
  );
};

Component.displayName = 'CalibrateContainer';
Component.propTypes = {
  onReady: func,
};

export default Component;
