import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import { bool, object } from 'prop-types';

import Link from '../Link';
import lottery from '../../assets/affiliates/lottery.png';

const Footer = ({ sx = {}, dark }) => (
  <Container
    sx={{
      borderTop: `24px solid #68996D`,
      textAlign: 'center',
      bgcolor: 'background.default',
      pb: 4,
      position: 'relative',
      zIndex: 1,
      pt: 10,
      img: dark
        ? {
            filter: 'invert(1)',
            mixBlendMode: 'lighten',
          }
        : null,
      ...sx,
    }}
    maxWidth={false}
  >
    <Grid container sx={{ width: '100%' }} justifyContent="center">
      <Grid item>
        <Typography variant="caption" sx={{ mx: 1 }}>
          <Link href="/privacy" shallow>
            Privacy policy
          </Link>
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="caption" sx={{ mx: 1 }}>
          <Link href="/cookies" shallow>
            Cookies policy
          </Link>
        </Typography>
      </Grid>
    </Grid>
    <Image width={240} height={117} src={lottery} />
    <Typography variant="body2" paragraph>
      <Link href="mailto:info@diglisjubilee.co.uk" target="_blank" external>
        info@diglisjubilee.co.uk
      </Link>
    </Typography>
  </Container>
);

Footer.displayName = 'PagesFooter';
Footer.propTypes = { dark: bool, sx: object };

export default Footer;
