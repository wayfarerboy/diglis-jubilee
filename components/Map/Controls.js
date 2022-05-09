import React from 'react';
import { string } from 'prop-types';

import Locate from './Locate';
import ZoomToFit from './ZoomToFit';

const Controls = ({ data = [], position }) => (
  <>
    <Locate data={data} position={position} />
    <ZoomToFit data={data} position={position} />
  </>
);

Controls.displayName = 'MapControls';
Controls.propTypes = { position: string };

export default Controls;
