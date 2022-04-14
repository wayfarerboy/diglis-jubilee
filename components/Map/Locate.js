import { useMap } from 'react-leaflet';

import useLocate from '../../hooks/useLocate';

const Locate = (props) => {
  const map = useMap();
  useLocate({ ...props, map });
  return null;
};

Locate.displayName = 'MapLocate';

export default Locate;
