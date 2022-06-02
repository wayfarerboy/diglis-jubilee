import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const activities = [
  { time: '12', text: ['Opening ceremony'] },
  {
    time: '12.30',
    text: [
      'Worcester Paint Festival artists begin',
      'Snoezelen music making sessions begin',
    ],
  },
  {
    time: '1',
    text: ['Fun dog show begins', `Children's sports activities begin`],
  },
  {
    time: '2',
    text: [
      'Nature walk begins from WEG stall',
      'Worcester Theatremakers session begins',
    ],
  },
  { time: '2.30', text: ['Unity Arts Bollywood performance & workshop'] },
  { time: '3', text: ['Immy & the Boatman perform'] },
  { time: '4', text: ['Woo Town perform'] },
  { time: '5', text: ['Event closes'] },
];

const WhatsOn = () => {
  return (
    <Box
      component="dl"
      sx={{
        display: 'grid',
        fontStyle: 'italic',
        fontWeight: 700,
        gridTemplateColumns: '1fr 9fr',
        gap: 2,
      }}
    >
      {activities.map(({ time, text }) => (
        <React.Fragment key={time}>
          <Typography
            component="dt"
            variant="h4"
            sx={{ textAlign: 'right', fontWeight: 700 }}
            color="primary.main"
          >
            {time}
            <Typography component="span" variant="h6">
              pm
            </Typography>
          </Typography>
          <Typography
            component="dd"
            color="primary.light"
            variant="h5"
            sx={{ fontWeight: 700 }}
          >
            {text.map((str, i) => (
              <React.Fragment key={str}>
                {i > 0 && <br />}
                {str}
              </React.Fragment>
            ))}
          </Typography>
        </React.Fragment>
      ))}
    </Box>
  );
};

WhatsOn.displayName = 'PagesWhatsOn';

export default WhatsOn;
