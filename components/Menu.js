import React, { useState } from 'react';
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

import Link from './Link';
import Logo from './Logo';

const links = [
  { href: '/', label: 'Home' },
  /* { href: '/activities', label: 'Activities' } */
  { href: '/memories', label: 'Memories' },
];

const Component = ({ dark }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <>
      <IconButton color="inherit" onClick={onOpen}>
        <Menu />
      </IconButton>
      <Drawer
        open={open}
        onClose={onClose}
        sx={{
          '.MuiDrawer-paper': {
            width: 200,
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
            >
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

Component.displayName = 'Menu';
Component.propTypes = { dark: bool };

export default Component;
