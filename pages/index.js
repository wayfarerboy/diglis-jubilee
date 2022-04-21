import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Activities from '../components/Pages/Activities';
import Footer from '../components/Pages/Footer';
import Link from '../components/Link';
import Logo from '../components/Logo';
import AppWrapper from '../components/AppWrapper';
import Section from '../components/Pages/Section';
import home from '../assets/home/PXL_20220326_173153326.jpg';
import involved from '../assets/home/PXL_20211231_083113472.jpg';
import building from '../assets/home/PXL_20210724_080859055.jpg';
import { globalStyles } from '../helpers/styles';

// description="Explore Diglis and listen to stories from the last 70 years"

const images = {
  home,
  building,
  involved,
};

const Home = () => {
  const [sections, setSections] = useState([0]);

  const onEnter = (index) => {
    setSections([index - 1, index, index + 1]);
  };
  return (
    <>
      {globalStyles}
      <AppWrapper
        title="Diglis Jubilee"
        description="Explore Diglis and hear historical accounts from our community"
      />
      <Box
        sx={{
          height: '100vh',
          perspective: 300,
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        <Section
          title={
            <Box
              sx={{
                mx: 'auto',
                width: 320,
                maxWidth: 'calc(100% - 32px)',
                minWidth: '50vw',
              }}
            >
              <Logo variant="full" />
              <Typography
                sx={{ color: 'secondary.light', fontWeight: 700 }}
                variant="h4"
              >
                05.06.22
              </Typography>
              <Typography variant="h5" sx={{ color: 'secondary.light' }}>
                12pm-5pm
              </Typography>
              <Link
                component={Button}
                external
                href="https://goo.gl/maps/mWLkpeTU4Xx5CC3s5"
                target="_blank"
                variant="outlined"
                sx={{
                  fontWeight: 700,
                  borderColor: 'secondary.light',
                  color: 'secondary.light',
                }}
              >
                Diglis Fields, Worcester
              </Link>
            </Box>
          }
          onEnter={onEnter}
          visible={sections.includes(0)}
          variant="h1"
          image={images.home}
          keyId="home"
          index={0}
          sx={{ height: '120vh', textAlign: 'center' }}
          innerSx={{ height: '100vh' }}
          imageSx={{
            img: {
              filter: 'hue-rotate(50deg) brightness(0.3)',
            },
          }}
          titleSx={{ background: 'transparent' }}
        />

        <Section
          index={1}
          onEnter={onEnter}
          visible={sections.includes(1)}
          title="On the 5th of June, Diglis is having a party 🎉"
          variant="h3"
          bgcolor="background.default"
          keyId="objectives"
          sx={{ bgcolor: 'background.default', py: 30 }}
          bodyVariant="h5"
          body={
            <>
              To coincide with the Queen&apos;s Platinum Jubilee, we&apos;re
              inviting the community to bring a picnic and join us on{' '}
              <Link
                external
                href="https://goo.gl/maps/mWLkpeTU4Xx5CC3s5"
                target="_blank"
              >
                Diglis fields
              </Link>{' '}
              to celebrate Diglis past, present and future.
            </>
          }
        />

        <Section
          index={2}
          onEnter={onEnter}
          visible={sections.includes(2)}
          title={
            <>
              <Typography variant="h2" paragraph>
                What&apos;s on
              </Typography>
              <Typography variant="h6" paragraph>
                The list of arts and activities we&apos;re hosting is growing
                week by week. Here&apos;s what we have confirmed so far:
              </Typography>
            </>
          }
          titleSx={{ color: 'common.white', background: 'transparent' }}
          variant="h2"
          image={images.building}
          imageSx={{
            img: {
              filter: 'hue-rotate(200deg) brightness(0.3)',
            },
          }}
          keyId="building"
          sx={{ minHeight: '100vh' }}
          innerSx={{
            minHeight: '100vh',
            '> div': {
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            },
          }}
          bodyVariant="h6"
          bodySx={{ background: 'transparent' }}
          body={<Activities />}
        />

        <Section
          index={3}
          visible={sections.includes(3)}
          onEnter={onEnter}
          variant="h2"
          keyId="community"
          sx={{ bgcolor: 'background.paper', py: 20 }}
          innerSx={{
            '> div': {
              display: 'grid',
            },
          }}
          title={
            <>
              <Typography variant="h2" paragraph>
                Want to contribute?
              </Typography>
              <Typography variant="h4" sx={{ mb: 4 }}>
                That&apos;s great! Here are a couple of ways you can get
                involved:
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: '32px',
                }}
              >
                <Box>
                  <Typography variant="h5" paragraph>
                    Volunteering
                  </Typography>
                  <Typography variant="body1" paragraph>
                    There&apos;s a lot going on, and on the day we&apos;ll be in
                    need of volunteers for setting up stalls and activities. Any
                    help would be most appreciated!
                  </Typography>
                  <Link
                    component={Button}
                    href="mailto:volunteer@diglisjubilee.co.uk"
                    external
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Volunteer
                  </Link>
                </Box>
                <Box>
                  <Typography variant="h5" paragraph>
                    Contribute a memory
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Our digital history project aims to record the
                    community&apos;s memories of Diglis, both written and
                    spoken, and we need your help to make this happen!
                  </Typography>
                  <Link
                    component={Button}
                    href="/memories"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Find out more
                  </Link>
                </Box>
              </Box>
            </>
          }
        />
        <Footer />
      </Box>
    </>
  );
};

export default Home;
