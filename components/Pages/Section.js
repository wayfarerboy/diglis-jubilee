import React, { useState } from 'react';
import { bool, oneOfType, any, string, object } from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Waypoint } from 'react-waypoint';
import { useTheme } from '@mui/material/styles';

const Section = ({
  variant,
  image,
  title,
  body,
  keyId,
  onEnter: enter,
  bodyVariant = 'h6',
  index,
  visible,
  sx = {},
  innerSx = {},
  imageSx = {},
  titleSx = {},
  bodySx = {},
}) => {
  const theme = useTheme();
  const [active, setActive] = useState(false);

  const onEnter = () => {
    setActive(true);
    enter(index);
  };

  const onLeave = () => {
    setActive(false);
  };

  return (
    <Waypoint onEnter={onEnter} onLeave={onLeave}>
      <Box
        sx={{
          transformStyle: 'preserve-3d',
          ...sx,
          position: 'relative',
          zIndex: image ? (active ? 1 : 0) : 2,
          opacity: visible ? 1 : 0,
          borderTop: index ? `24px solid #68996D` : 'none',
          borderBottom: `24px solid #DFCC4D`,
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            zIndex: 3,
            position: 'relative',
            transform: 'translateZ(0) scale(1)',
            ...innerSx,
          }}
        >
          <Container component={Grid} item>
            <Box
              sx={{
                p: 2,
                pb: 1,
                mb: 0.5,
                display: 'inline-block',
                bgcolor: 'background.default',
                ...titleSx,
              }}
            >
              <Typography display="inline" variant={variant} component="div">
                {title}
              </Typography>
            </Box>
            {body && (
              <Box
                sx={{
                  p: 2,
                  pt: 1,
                  display: 'inline-block',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  maxWidth: '100%',
                  ...bodySx,
                }}
              >
                {body && bodyVariant ? (
                  <Typography
                    variant={bodyVariant}
                    sx={
                      bodyVariant === 'h6'
                        ? {
                            fontWeight: 300,
                            fontSize: {
                              xs: theme.typography.body2.fontSize,
                              sm: theme.typography.body1.fontSize,
                              md: theme.typography.h6.fontSize,
                            },
                          }
                        : {}
                    }
                  >
                    {body}
                  </Typography>
                ) : (
                  body
                )}
              </Box>
            )}
          </Container>
        </Grid>
        {image && (
          <Box
            sx={{
              zIndex: 2,
              position: 'absolute',
              transform: 'translateZ(-600px) scale(4)',
              height: '100vh',
              top: 0,
              left: 0,
              width: '100%',
              ...imageSx,
            }}
          >
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                alt={`${keyId} background`}
                src={image}
                layout="fill"
                placeholder="blur"
                objectFit="cover"
              />
            </Box>
          </Box>
        )}
      </Box>
    </Waypoint>
  );
};

Section.propTypes = {
  image: oneOfType([object, string]),
  title: oneOfType([string, object]),
  body: any,
  bodyVariant: oneOfType([string, bool]),
  keyId: string,
  variant: string,
  sx: object,
};

export default Section;
