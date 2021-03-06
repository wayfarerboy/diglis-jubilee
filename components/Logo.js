import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { bool, object, string } from 'prop-types';

import logoSvg from '../assets/logo-full.min.svg';

const LogoFull = ({ sx, ...props }) =>
  sx ? (
    <Box sx={sx}>
      <Image src={logoSvg} {...props} priority />
    </Box>
  ) : (
    <Image src={logoSvg} {...props} priority />
  );

const Logo = ({ sx, variant = 'header', dark, ...props }) =>
  variant === 'full' ? (
    <LogoFull sx={sx} {...props} />
  ) : (
    <SvgIcon
      viewBox="0 0 26 7"
      sx={{
        color: dark ? 'primary.main' : 'secondary.light',
        fontSize: 128,
        ml: 1,
        height: { xs: 56, sm: 64 },
        pt: 0.75,
        ...(sx || {}),
      }}
      {...props}
    >
      <path
        d="M11.6 5.4h.3q.5 0 .8-.6.3-.6.3-1.5 0-.4-.2-.6 0-.3-.3-.3t-.6.3l-.3 2.7Zm4-.4v.1l.1.2h.1l.2-.1.1.2-.3.3q-.3.2-.7.2l-.5-.1-.2-.3v-.1l.2-1.4.2-1.5-.4-.2V2l1.4-.2.2.1-.4 3.2Zm0-3.8-.4-.1-.2-.4q0-.3.2-.5t.6-.2l.4.2.1.3q0 .3-.2.5t-.5.2Zm2 3.8v.3h.2l.2-.1v.2q-.3.5-.9.5l-.5-.1q-.2-.1-.2-.4v-.2L17 .7l-.5-.1.1-.3L18 .2h.2L17.5 5ZM20 2.3q-.3 0-.5.5-.2.4-.2 1h.5l.4-.4.1-.6q0-.5-.3-.5Zm3.5 0q-.4 0-.6.5-.2.4-.2 1h.5l.4-.4.2-.6q0-.5-.3-.5ZM7.9 3.8V4l-.1.9v.3l.3.1h.4l.3-.3.4-3.1h1L9.9 5q0 .3.2.3h.1l.2-.1v.4l-.4.2H9l-.2-.3v-.2q-.2.3-.5.4-.3.2-.7.2L7 5.7q-.3-.2-.3-.7l.1-1v-.2L7 2.5l-.5-.2V2L8 1.8l.2.1L8 3.8ZM6.4 1.1v.1l-.4 3-.2 1.4q-.2.6-.8 1-.6.3-1.3.4l-.2-.4q.5-.1.8-.4l.3-.7.6-4.4-.5-.1V.6H7V1h-.5ZM12 2.2q.4-.4 1-.4.5 0 .8.4.3.4.3 1.1 0 .7-.3 1.3-.3.6-.8 1-.5.3-1.2.3l-.8-.2-.5.2.6-5.2-.4-.1.1-.3L12 .2h.2l-.2 2Zm9.3 2.9-.6.6q-.4.2-1 .2-.5 0-.9-.2-.3-.2-.5-.6l-.1-.8q0-.7.3-1.2.3-.6.8-1 .5-.3 1-.3.7 0 1 .3.2.2.2.6 0 .5-.3.9l-.8.5-1 .2q0 .5.2.8.1.2.4.2l.6-.1.5-.5.2.4Zm3.4 0-.6.6q-.4.2-1 .2-.5 0-.9-.2-.3-.2-.5-.6l-.1-.8q0-.7.3-1.2.3-.6.8-1 .5-.3 1.1-.3.6 0 .9.3.2.2.2.6 0 .5-.3.9l-.8.5-1 .2q0 .5.2.8.1.2.5.2l.6-.1.4-.5.2.4Zm-23-2.4v-.4h-.3v.4h.2Zm2 0v-.3h-.3v.3h.4Zm-1.6-.2h.2v-.2H2v.2Zm0-.4h.2v-.2H2V2Zm0-.5h.2v-.2H2v.2Zm-.5.5h.2v-.2h-.2V2Zm0-.5h.2v-.2h-.2v.2Zm0-.4h.2V1h-.2v.2Zm-.4.9h.2v-.2h-.2V2Zm0-.5h.2v-.2h-.2v.2Zm0-.4h.2V1h-.2v.2ZM.7 2.5H1v-.2H.7v.2Zm0-.4H1v-.2H.7V2Zm3 0V2l-.2.1h.4ZM.6 4.4V4h.3l.7.1c.2 0 .3-.2.7-.2l.6.2c.3 0 .3-.2.7-.2h.2a2 2 0 0 1-.7.6h-.2c-.4 0-.4-.2-.6-.2-.3 0-.3.2-.7.2-.4 0-.4-.2-.7-.2l-.3.1Zm0-.8v-.4h.3l.7.1c.2 0 .3-.2.7-.2l.6.2c.3 0 .3-.2.7-.2l.6.2c0 .2 0 .3-.2.4l-.4-.2c-.3 0-.3.2-.7.2-.4 0-.4-.2-.6-.2-.3 0-.3.2-.7.2-.4 0-.4-.2-.7-.2l-.3.1Zm2-.9V1.2H2V.8H1v.8H.5V3h3.6v-.7h.3l-.8-.7-.3.2v-.2H3v.5l-.2.2H3v.4h-.5ZM0 5.2V0h2.2a2.6 2.6 0 0 1 2.4 1.6A2.5 2.5 0 0 1 4.7 3 2.6 2.6 0 0 1 4 4.4a2.6 2.6 0 0 1-1.8.8H0Z"
        fillRule="evenodd"
      />
    </SvgIcon>
  );

Logo.displayName = 'Logo';
Logo.propTypes = {
  sx: object,
  variant: string,
  dark: bool,
};

export default Logo;
