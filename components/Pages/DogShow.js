import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListSubheader from '@mui/material/ListSubheader';

import Link from '../Link';

const categories = [
  { primary: 'Most appealing eyes' },
  { primary: 'Cutest puppy under one' },
  { primary: 'Sweetest senior over seven' },
  { primary: 'Loveliest rescue' },
  { primary: 'Best young handler under 16' },
  { primary: 'Waggiest tail' },
  { primary: 'Happiest Heinz 57', secondary: 'Mixed breed' },
  { primary: 'Best in show', secondary: 'From the winner of each class' },
];

const DogShow = () => {
  return (
    <>
      <Typography
        paragraph
        sx={{ color: 'text.secondary', fontWeight: 700 }}
        variant="h5"
      >
        Fun dog show details
      </Typography>
      <Typography variant="inherit" sx={{ color: 'text.secondary' }} paragraph>
        Register your dog in a category at the information tent in the centre of
        the field. The price for registration is{' '}
        <Typography
          component="span"
          sx={{ color: 'primary.light', fontWeight: 700 }}
        >
          £2
        </Typography>{' '}
        per dog and{' '}
        <Typography
          component="span"
          sx={{ color: 'primary.light', fontWeight: 700 }}
        >
          £5
        </Typography>{' '}
        for 3 dogs, and all proceeds go to{' '}
        <Link href="https://diglishub.co.uk" external target="_blank">
          Diglis Hub
        </Link>
        , a charity aiming to operate a community hub to serve our
        neighbourhood.
      </Typography>
      <List sx={{ color: 'text.primary' }}>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ primary, secondary }) => (
          <ListItem key={primary} divider>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

DogShow.displayName = 'PagesDogShow';

export default DogShow;
