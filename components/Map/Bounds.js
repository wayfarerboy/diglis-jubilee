import { number } from 'prop-types';
import { useMap } from 'react-leaflet';
import useBounds from '../../hooks/useBounds';

const Bounds = ({ pad, data }) => {
  const map = useMap({ data });
  useBounds({ data, pad, map });
  return null;
};

Bounds.displayName = 'MapBounds';
Bounds.propTypes = {
  pad: number,
};

export default Bounds;
