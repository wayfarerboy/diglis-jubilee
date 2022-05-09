import React, { useState } from 'react';
import { bool } from 'prop-types';
import dynamic from 'next/dynamic';
import 'regenerator-runtime/runtime';

import Loading from '../components/Loading';
import ComingSoon from '../components/ComingSoon';

const Calibrate = dynamic(() => import('../components/Calibrate'), {
  loading: Loading,
  ssr: false,
});

const Wrapper = dynamic(() => import('../components/Wrapper'), {
  loading: Loading,
  ssr: false,
});

// description="Explore Diglis and listen to stories from the last 70 years"
//
const Memories = ({ isProduction }) => {
  const [ready, setReady] = useState(false);
  const onReady = () => setReady(true);
  if (isProduction) return <ComingSoon />;
  if (!ready) return <Calibrate onReady={onReady} />;
  return <Wrapper />;
};

Memories.displayName = 'pagesMemories';
Memories.propTypes = { isProduction: bool };

export async function getStaticProps() {
  return {
    props: {
      isProduction: process.env.VERCEL_ENV === 'production',
    },
  };
}

export default Memories;
