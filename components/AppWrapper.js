import React from 'react';
import Head from 'next/head';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import { string, bool } from 'prop-types';

import Logo from './Logo';
import Menu from './Menu';

const Wrapper = ({ dark, title, description }) => {
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
};

export default Wrapper;
