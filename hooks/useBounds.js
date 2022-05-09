import { useMemo } from 'react';
import Leaflet from 'leaflet';

const useBounds = ({ data, pad, map } = {}) => {
  const result = useMemo(() => {
    let value = data.reduce(
      (bounds, { latlng }) => bounds.extend(latlng),
      Leaflet.latLngBounds(),
    );
    if (data.length && pad) value = value.pad(pad);
    if (map) map.setMaxBounds(value);
    return value;
  }, [data]);

  return result;
};

export default useBounds;
