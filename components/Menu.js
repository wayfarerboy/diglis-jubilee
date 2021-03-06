import React from 'react';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { bool } from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';

import lottery from '../assets/affiliates/lottery.png';
import Link from './Link';
import Logo from './Logo';

const links = [
  { href: '/', label: 'Home' },
  /* { href: '/activities', label: 'Activities' } */
  { href: '/whats-on', label: `What's on` },
  { href: '/map', label: 'Event map' },
  { href: '/memories', label: 'Memories' },
];

const Component = ({ dark }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const open = useSelector(({ app }) => app.menuOpen);
  const onOpen = () => dispatch({ type: 'menuOpen' });
  const onClose = () => dispatch({ type: 'menuClose' });
  return (
    <>
      <IconButton
        sx={{ pointerEvents: 'auto' }}
        color="inherit"
        onClick={onOpen}
      >
        <Menu />
      </IconButton>
      <Drawer
        open={open}
        onClose={onClose}
        sx={{
          zIndex: 'modal',
          position: 'relative',
          '.MuiDrawer-paper': {
            width: 200,
            pointerEvents: 'auto',
          },
        }}
      >
        <AppBar position="static">
          <Toolbar disableGutters>
            <Logo dark={dark} sx={{ pl: 1, fontSize: 148 }} />
          </Toolbar>
        </AppBar>
        <List disablePadding>
          {links.map(({ href, label }) => (
            <ListItem
              key={href}
              button
              component={Link}
              href={href}
              shallow
              selected={href === router.asPath}
              onClick={onClose}
            >
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
        <Grid xs item />
        <Box
          sx={{
            textAlign: 'center',
            filter: dark ? 'invert(1)' : 'none',
            mixBlendMode: dark ? 'lighten' : 'none',
          }}
        >
          <Image width={240} height={117} src={lottery} />
        </Box>
      </Drawer>
    </>
  );
};

Component.displayName = 'Menu';
Component.propTypes = { dark: bool };

export default Component;
