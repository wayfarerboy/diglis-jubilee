import React from 'react';
import { func, object, string } from 'prop-types';
import Image from 'next/image';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { useTheme } from '@mui/material/styles';

const Artwork = ({ onClick, image, sx = {} }) => {
  const theme = useTheme();
  return (
    <Paper
      component={ButtonBase}
      onClick={onClick}
      sx={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '1 / 1',
        backgroundImage: `linear-gradient(25deg, ${theme.palette.primary.main} -50%, ${theme.palette.primary.dark} 20%, ${theme.palette.secondary.dark} 90%)`,
        ...sx,
        maxHeight: '40vh',
        img: {
          objectFit: 'cover',
        },
      }}
    >
      {image && <Image src={image} layout="fill" />}
    </Paper>
  );
};

Artwork.displayName = 'PlayerArtwork';
Artwork.propTypes = {
  image: string,
  sx: object,
  onToggle: func,
};

export default Artwork;
