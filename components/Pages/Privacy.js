import React from 'react';
import Container from '@mui/material/Container';

import Footer from './Footer';
import { globalStyles } from '../../helpers/styles';
import Markdown from '../Markdown';
import AppWrapper from '../AppWrapper';

const Privacy = () => {
  return (
    <>
      {globalStyles}
      <AppWrapper title="Diglis Jubilee Privacy Policy" />
      <Container
        maxWidth="md"
        sx={{ height: '100%', overflowY: 'auto', py: 12 }}
      >
        <Markdown
          text={`
# Diglis Jubilee Privacy Policy

## Our contact details 

**Name**: Diglis Jubilee
**Email**: [admin@diglisjubilee.co.uk](mailto:admin@diglisjubilee.co.uk)
**Date**: 21.04.22

## The type of personal information we collect 

We currently collect and process the following information:

- Personal identifiers, contacts and characteristics (for example, name and contact details)

## How we get the personal information and why we have it

Most of the personal information we process is provided to us directly by you for one of the following reasons:
      
- Supplying your memories of Diglis for our Diglis Jubilee Memories project
- Contacting us directly via our email link

We use the information that you have given us in order to respond to you directly. 

We never share this information with anyone else.

Under the UK General Data Protection Regulation (UK GDPR), the lawful bases we rely on for processing this information are:

- Your consent. You are able to remove your consent at any time. You can do this by contacting [admin@diglisjubilee.co.uk](mailto:admin@diglisjubilee.co.uk)
- We have a legitimate interest.

## How we store your personal information 

Your information is securely stored. 

We keep your email address until 06.06.22. We will then dispose of your information by deleting your emails from our servers.

## Your data protection rights

Under data protection law, you have rights including:

- Your right of access - You have the right to ask us for copies of your personal information. 
- Your right to rectification - You have the right to ask us to rectify personal information you think is inaccurate. You also have the right to ask us to complete information you think is incomplete. 
- Your right to erasure - You have the right to ask us to erase your personal information in certain circumstances.
- Your right to restriction of processing - You have the right to ask us to restrict the processing of your personal information in certain circumstances. 
- Your right to object to processing - You have the right to object to the processing of your personal information in certain circumstances.
- Your right to data portability - You have the right to ask that we transfer the personal information you gave us to another organisation, or to you, in certain circumstances.
- You are not required to pay any charge for exercising your rights. If you make a request, we have one month to respond to you.

Please contact us at [admin@diglisjubilee.co.uk](mailto:admin@diglisjubilee.co.uk) if you wish to make a request.

## How to complain

If you have any concerns about our use of your personal information, you can make a complaint to us at
[admin@diglisjubilee.co.uk](mailto:admin@diglisjubilee.co.uk).

You can also complain to the ICO if you are unhappy with how we have used your data.

The ICO’s address:            

Information Commissioner’s Office
Wycliffe House
Water Lane
Wilmslow
Cheshire
SK9 5AF

Helpline number: 0303 123 1113

ICO website: [https://www.ico.org.uk](https://www.ico.org.uk)
`}
        />
      </Container>
      <Footer />
    </>
  );
};

Privacy.displayName = 'PagesPrivacy';

export default Privacy;
