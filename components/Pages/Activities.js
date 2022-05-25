import React, { useMemo } from 'react';
import NoSsr from '@mui/material/NoSsr';
import { bool } from 'prop-types';
import Typography from '@mui/material/Typography';

import Link from '../Link';

const byRandom = () => (Math.round(Math.random()) ? -1 : 1);

const _activities = [
  {
    text: 'Jubilee-inspired community dance performance by',
    linkText: 'Dancefest',
    href: 'https://www.dancefest.co.uk/',
  },
  {
    text: 'Live street art from',
    linkText: 'Worcester Paint Festival Triangle',
    href: 'https://worcesterpaintfestival.co.uk/',
  },
  {
    text: 'Live music from',
    linkText: 'Immy & The Boatman',
    href: 'https://www.facebook.com/Immy-The-Boatman-180798736007507/',
  },
  {
    text: 'Live music from',
    linkText: 'Woo Town',
    href: 'https://www.facebook.com/WooTownHillbillies',
  },
  {
    text: `Children's drama workshops`,
    linkText: 'Worcester Theatremakers',
    href: 'http://www.worcestertheatremakers.co.uk/',
  },
  {
    text: 'Specially written poem performed by Commandery Poet in Residence',
    linkText: 'Leena Batchelor',
    href: 'https://www.instagram.com/pixiemusepoetry/?hl=en',
  },
  {
    text: 'Fun dog show run by vets',
    linkText: 'MacArthur Barstow & Gibbs',
    href: 'https://mbgvet.com/',
  },
  { text: 'Have-a-go dog agility run by local enthusiasts Al and Cath' },
  {
    text: 'Pop-up museum by',
    linkText: 'Royal Porcelain Works',
    href: 'https://www.royalporcelainworks.co.uk/',
  },
  {
    text: 'Have-a-go family sports and games run by',
    linkText: 'Active Communities Worcester',
    href: 'https://www.freedom-leisure.co.uk/centres/active-communities/worcester/',
  },
  {
    text: 'BBQ by',
    linkText: 'Café Afloat',
    href: 'https://www.facebook.com/Cafe-Afloat-265418490330744/',
  },
  { linkText: 'Digital community history tour', path: '/memories' },
  {
    text: 'Train rides by',
    linkText: 'Worcester and District Model Engineers',
    href: 'https://www.facebook.com/worcestermes/',
  },
  {
    text: 'Virtual community hub by',
    linkText: 'Diglis Hub',
    href: 'https://www.diglishub.co.uk',
  },
  {
    text: 'Nature walks by local expert Glen Dipple',
  },
  {
    text: 'Boat dressing and flotilla by the community at',
    linkText: 'Diglis Waterside & Marina',
    href: 'https://www.aquavista.com/find-a-marina/diglis-waterside-marina',
  },
  {
    text: 'Information stalls from',
    linkText: [
      'Time to Change',
      'Swan Food Project',
      'Worcester Environmental Group',
      'Behind the Smile',
      'Diglis Hub',
    ].sort(byRandom),
    href: [
      '',
      'https://www.facebook.com/The-Swan-Food-Project-549819075117845/',
      'https://www.theweg.org.uk/',
    ],
  },
  {
    text: '',
    linkText: 'Camarados public living room',
    href: 'https://www.camerados.org/public-living-room',
  },
  {
    text: 'Music Making with',
    linkText: 'Worcester Snoezelen',
    href: 'https://www.worcestersnoezelen.org.uk',
  },
];

const Activities = ({ noRandom }) => {
  const activities = useMemo(
    () => (noRandom ? _activities : _activities.sort(byRandom)),
    [],
  );
  return (
    <NoSsr>
      {activities.map(({ text = '', linkText = '', href, path }, i) => (
        <Typography
          component="span"
          variant="inherit"
          key={`${text || linkText}-${i}`}
          sx={{
            color: ['primary.light', 'secondary.light'][i % 2],
            mr: 1,
            fontWeight: 700,
          }}
        >
          {text}
          {linkText ? ' ' : ''}
          {typeof linkText === 'string' && (
            <Link
              href={href || path}
              sx={{ color: 'inherit' }}
              external={!!href}
              shallow={!!path}
              target={href ? '_blank' : null}
            >
              {linkText}
            </Link>
          )}
          {typeof linkText === 'object' &&
            linkText.map((text, i) => (
              <React.Fragment key={`${text}-${i}`}>
                <Link
                  href={href[i]}
                  sx={{ color: 'inherit' }}
                  external
                  target="_blank"
                >
                  {text}
                </Link>
                {i === linkText.length - 2
                  ? ' and '
                  : i < linkText.length - 1
                  ? ', '
                  : ''}
              </React.Fragment>
            ))}{' '}
        </Typography>
      ))}
    </NoSsr>
  );
};

Activities.displayName = 'PagesActivities';
Activities.propTypes = { noRandom: bool };

export default Activities;
