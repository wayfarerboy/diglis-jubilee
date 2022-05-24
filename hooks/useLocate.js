import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Leaflet from 'leaflet';

const rotateRegExp = /[\d.]+deg/g;

const useLocate = ({
  maximumAge = 0,
  enableHighAccuracy = true,
  position = 'topleft',
  map: _map,
  data,
  onError,
  onLocation,
} = {}) => {
  const locate = useRef(null);
  const [map] = useState(_map || Leaflet.map());
  const dispatch = useDispatch();
  const [inited, setInited] = useState(false);
  const [locationFound, setLocationFound] = useState(false);
  const current = useSelector(({ geolocation }) => geolocation.latlng);
  const mode = useSelector(({ playback }) => playback.mode);
  const [watching, setWatching] = useState(false);

  const onLocationError = (err) => {
    if (err.code === 1) dispatch({ type: 'locationDenied' });
    onError?.(err);
  };

  useEffect(() => {
    if (!inited) {
      locate.current = Leaflet.control
        .locate({
          position,
          onLocationError,
          locateOptions: {
            setView: false,
            enableHighAccuracy,
            maximumAge,
          },
        })
        .addTo(map);
      map.addEventListener(
        'locationfound',
        ({ latlng, heading = 0, accuracy }) => {
          dispatch({
            type: 'setGeolocation',
            payload: {
              latlng: { lat: latlng.lat, lng: latlng.lng },
              heading,
              accuracy,
            },
          });
          onLocation?.(latlng);
        },
      );
    }
  }, [map, setInited, inited]);

  useEffect(() => {
    if (mode === 'moving' && !watching && locate.current) {
      setWatching(true);
      locate.current.start();
    } else if (mode === 'closest' && watching && locate.current) {
      setWatching(false);
      locate.current.stop();
    }
  }, [mode, watching, setWatching]);

  useEffect(() => {
    if (inited && current) {
      if (!locationFound) {
        const bounds = Leaflet.latLngBounds(current);
        data
          .filter((item) => item.latlng)
          .forEach((item) => {
            bounds.extend(item.latlng);
          });
        map.panTo(bounds, { padding: [16, 16] });
        setLocationFound(true);
      }
      const el = document.querySelector('.leaflet-control-locate-heading svg');
      if (!el) {
        dispatch({ type: 'setBearing', payload: 0 });
      } else {
        const rotateVal = Number(
          (el.style.transform || '')
            .match(rotateRegExp)?.[0]
            ?.replace('deg', '') || 0,
        );
        dispatch({ type: 'setBearing', payload: rotateVal });
      }
    }
  }, [inited, locationFound, dispatch, current]);
};

export default useLocate;
