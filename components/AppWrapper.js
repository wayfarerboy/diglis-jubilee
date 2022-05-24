import React from 'react';
import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { node, string, bool } from 'prop-types';
import Grid from '@mui/material/Grid';

import Logo from './Logo';
import Menu from './Menu';

const Wrapper = ({ action, dark, title, description }) => {
  const theme = useTheme();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <AppBar
        sx={{
          background: `linear-gradient(180deg, ${
            dark ? theme.palette.common.black : theme.palette.primary.dark
          }, transparent)`,
          boxShadow: 'none',
          pointerEvents: 'none',
        }}
      >
        <Toolbar>
          <Menu dark={dark} />
          <Logo
            sx={{
              color: dark ? 'primary.main' : 'secondary.light',
              fontSize: 128,
              ml: 1,
              height: { xs: 56, sm: 64 },
              pt: 0.75,
            }}
          />
          {action && <Grid xs item />}
          {action && (
            <Grid
              item
              sx={{
                mr: { sm: `320px`, md: `420px`, lg: `420px`, xl: `420px` },
              }}
            >
              {action}
            </Grid>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

Wrapper.displayName = 'AppWrapper';
Wrapper.propTypes = {
  dark: bool,
  title: string,
  description: string,
  action: node,
};

export default Wrapper;
