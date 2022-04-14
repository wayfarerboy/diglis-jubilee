import React, { useRef, useEffect } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { shape, number, string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import useMarkerIcons from '../../hooks/useMarkerIcons';

const Component = ({ item }) => {
  const marker = useRef(null);
  const dispatch = useDispatch();
  const selected = useSelector(({ map }) => map.details?.docId);
  const labelOpen = useSelector(({ map }) => map.label === item.id);
  const [icon, selectedIcon] = useMarkerIcons(item.id);

  const onSelect =
    ({ title, description, image, id: docId }) =>
    () => {
      dispatch({ type: 'setAppDrawer', payload: null });
      dispatch({
        type: 'openDetails',
        payload: { title, description, image, docId },
      });
    };

  useEffect(() => {
    if (marker.current) {
      marker.current[labelOpen ? 'openTooltip' : 'closeTooltip']();
    }
  }, [marker.current, labelOpen]);

  return (
    <Marker
      ref={marker}
      position={item.latlng}
      key={item.id}
      eventHandlers={{ click: onSelect(item) }}
      icon={item.id === selected ? selectedIcon : icon}
      docId={item.id}
    >
      <Tooltip>{item.title}</Tooltip>
    </Marker>
  );
};

Component.displayName = 'MapMarker';
Component.propTypes = {
  item: shape({
    id: string,
    latlng: shape({ lat: number, lng: number }),
    title: string,
  }),
};

export default Component;
