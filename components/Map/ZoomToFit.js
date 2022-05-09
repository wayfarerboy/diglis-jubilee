import { useCallback, useEffect, useState } from 'react';
import Leaflet from 'leaflet';
import { useMap } from 'react-leaflet';
import { string } from 'prop-types';
import GlobalStyles from '@mui/material/GlobalStyles';

import useBounds from '../../hooks/useBounds';

const globalStyles = (
  <GlobalStyles
    styles={{
      '.leaflet-control-zoomtofit-icon': {
        backgroundImage: 'url(/zoom_out.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 22,
        width: 28,
        height: 28,
        display: 'inline-block',
      },
    }}
  />
);

const ZoomToFit = ({ data = [], position = 'topleft' }) => {
  const [inited, setInited] = useState(false);
  const bounds = useBounds({ data });
  const map = useMap({ data });

  const onZoomToFit = useCallback(() => {
    map.flyToBounds(bounds);
  }, [bounds]);

  useEffect(() => {
    if (map && !inited) {
      Leaflet.Control.ZoomToFit = Leaflet.Control.extend({
        onAdd() {
          const el = Leaflet.DomUtil.create('div', 'leaflet-bar zoom-to-fit');
          const a = Leaflet.DomUtil.create(
            'a',
            'leaflet-bar-part leaflet-bar-part-single',
          );
          a.title = 'Show all markers';
          a.style.cursor = 'pointer';
          a.onclick = onZoomToFit;
          const span = Leaflet.DomUtil.create(
            'span',
            'leaflet-control-zoomtofit-icon',
          );
          a.appendChild(span);
          el.appendChild(a);
          return el;
        },

        onRemove() {},
      });

      Leaflet.control.zoomToFit = (opts) => new Leaflet.Control.ZoomToFit(opts);

      Leaflet.control.zoomToFit({ position }).addTo(map);
      setInited(true);
    }
  }, [inited, setInited, map]);

  return globalStyles;
};

ZoomToFit.displayName = 'MapZoomToFit';
ZoomToFit.propTypes = {
  position: string,
};

export default ZoomToFit;
