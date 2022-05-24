import React from 'react';
import dynamic from 'next/dynamic';

import Loading from '../../components/Loading';

const Wrapper = dynamic(() => import('../../components/Wrapper'), {
  loading: Loading,
  ssr: false,
});

const Memories = () => <Wrapper />;
Memories.displayName = 'pagesMemories';

export default Memories;
