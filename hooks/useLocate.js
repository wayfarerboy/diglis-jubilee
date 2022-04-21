import { useState, useEffect } from 'react';
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
  const [map] = useState(_map || Leaflet.map());
  const dispatch = useDispatch();
  const [inited, setInited] = useState(false);
  const [locationFound, setLocationFound] = useState(false);
  const current = useSelector(({ geolocation }) => geolocation.latlng);

  const onLocationError = (err) => {
    if (err.code === 1) dispatch({ type: 'locationDenied' });
    onError?.(err);
  };

  const onLocationOutsideMapBounds = () => {
    dispatch({
      type: 'setPlaybackMode',
      payload: 'closest',
    });
    onError?.({ code: -1 });
  };

  useEffect(() => {
    if (!inited) {
      const locate = Leaflet.control
        .locate({
          position,
          onLocationOutsideMapBounds,
          onLocationError,
          locateOptions: {
            setView: false,
            enableHighAccuracy,
            maximumAge,
          },
        })
        .addTo(map);
      locate.start();
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
    if (inited && current) {
      if (!locationFound) {
        const bounds = Leaflet.latLngBounds(current);
        data.forEach((item) => {
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
