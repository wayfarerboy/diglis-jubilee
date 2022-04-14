import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const rotateRegExp = /[\d.]+deg/g;

const useBearing = () => {
  const dispatch = useDispatch();
  const current = useSelector(({ geolocation }) => geolocation.latlng);

  useEffect(() => {
    if (current) {
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
  }, [dispatch, current]);
};

export default useBearing;
