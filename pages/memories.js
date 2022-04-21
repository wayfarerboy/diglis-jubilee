import React, { useState } from 'react';
import dynamic from 'next/dynamic';
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
const Home = () => {
  const [ready, setReady] = useState(false);
  const onReady = () => setReady(true);
  if (process.env.VERCEL_ENV === 'production') return <ComingSoon />;
  if (!ready) return <Calibrate onReady={onReady} />;
  return <Wrapper />;
};

export default Home;
