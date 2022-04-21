import React from 'react';
import Container from '@mui/material/Container';

import Footer from './Footer';
import { globalStyles } from '../../helpers/styles';
import Markdown from '../Markdown';
import AppWrapper from '../AppWrapper';

const Cookies = () => {
  return (
    <>
      {globalStyles}
      <AppWrapper title="Diglis Jubilee Cookies Policy" />
      <Container
        maxWidth="md"
        sx={{ height: '100%', overflowY: 'auto', py: 12 }}
      >
        <Markdown
          text={`
# Diglis Jubilee Cookies Policy

## Our contact details 

**Name**: Diglis Jubilee
**Email**: [admin@diglisjubilee.co.uk](mailto:admin@diglisjubilee.co.uk)
**Date**: 21.04.22

## What are cookies?
Cookies are simple text files that are stored on your computer or mobile device by a website’s server. Each cookie is unique to your web browser. It will contain some anonymous information such as a unique identifier, website’s domain name, and some digits and numbers.

## What types of cookies do we use?
We use cookies to enable us and our Google Analytics service to collect aggregated, anonymised data for statistical purposes on how our visitors use this website. These cookies do not contain personal information such as names and email addresses and are used to help us provide our funders with visitor and engagement numbers.

## How to delete cookies?
If you want to restrict or block the cookies that are set by our website you can do so through your browser settings. Alternatively you can visit [internetcookies.org](https://www.internetcookies.org) which contains comprehensive information on how to do this on a wide variety of browsers and devices.

`}
        />
      </Container>
      <Footer />
    </>
  );
};

Cookies.displayName = 'PagesCookies';

export default Cookies;
