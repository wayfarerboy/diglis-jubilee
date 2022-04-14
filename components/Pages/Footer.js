import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Image from 'next/image';

import lottery from '../../assets/affiliates/lottery.png';

const Footer = () => (
  <Container
    sx={{
      borderTop: `24px solid #68996D`,
      textAlign: 'center',
      bgcolor: 'background.default',
      pb: 4,
      position: 'relative',
      zIndex: 1,
      pt: 10,
    }}
  >
    <Image width={240} height={117} src={lottery} />
    <Typography variant="body2" paragraph>
      <Link href="mailto:info@diglisjubilee.co.uk" target="_blank">
        info@diglisjubilee.co.uk
      </Link>
    </Typography>
  </Container>
);

Footer.displayName = 'PagesFooter';

export default Footer;
