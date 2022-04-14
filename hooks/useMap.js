import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import Leaflet from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet.locatecontrol';
import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
import 'leaflet.offline';

const rotateRegExp = /[\d.]+deg/g;

const useMap = ({ ref: mapRef, data }) => {
  const dispatch = useDispatch();
  const center = useSelector(({ map }) => map.center);
  const zoom = useSelector(({ map }) => map.zoom);
  const current = useSelector(({ geolocation }) => geolocation.latlng);
  const [locationFound, setLocationFound] = useState(false);
  const [map, setMap] = useState();

  const addMarkers = (map, data) => {
    if (map) {
      map.eachLayer(
        (layer) => layer instanceof Leaflet.Marker && map.removeLayer(layer),
      );
      const bounds = Leaflet.latLngBounds();
      data.forEach((item) => {
        const marker = Leaflet.marker(item.latlng);
        marker.bindTooltip(item.title);
        marker.addTo(map);
        marker.addEventListener('click', () =>
          dispatch({ type: 'setMarker', payload: item.id }),
        );
        bounds.extend(item.latlng);
      });
      map.flyToBounds(bounds, { padding: [16, 16] });
    }
  };

  useEffect(() => {
    if (current) {
      if (!locationFound) {
        const bounds = Leaflet.latLngBounds(current);
        data.forEach((item) => {
          bounds.extend(item.latlng);
        });
        map.flyToBounds(bounds, { padding: [16, 16] });
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
  }, [locationFound, dispatch, current]);

  useEffect(() => {
    if (!map && mapRef.current) {
      const _map = Leaflet.map(mapRef.current, { zoomControl: false }).setView(
        center,
        zoom,
      );
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(_map);
      Leaflet.control.zoom({ position: 'bottomright' }).addTo(_map);
      addMarkers(_map, data);
      const locate = Leaflet.control
        .locate({
          setView: false,
          enableHighAccuracy: true,
          position: 'bottomright',
        })
        .addTo(_map);
      locate.start();
      _map.addEventListener('locationfound', ({ latlng, heading = 0 }) => {
        dispatch({
          type: 'setGeolocation',
          payload: { latlng: [latlng.lat, latlng.lng], heading },
        });
      });
      setMap(_map);
    }
  }, [setMap, map, center, mapRef, zoom, dispatch]);

  useEffect(() => {
    addMarkers(map, data);
  }, [data]);

  useEffect(() => {
    if (map) map.panTo(center);
  }, [center]);

  return map;
};

export default useMap;
