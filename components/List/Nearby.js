import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import { arrayOf, string, shape, object } from 'prop-types';
import { useDispatch } from 'react-redux';
import Collapse from '@mui/material/Collapse';

import useWidth from '../../hooks/useWidth';
import ListItem from './ListItem';

const scrollOptsSupported =
  'scrollBehavior' in (document?.documentElement.style || {});

const Nearby = ({ data = [], map, onView }) => {
  const listRef = useRef(null);
  const [hover, setHover] = useState();
  const width = useWidth();
  const dispatch = useDispatch();
  const noClose = width !== 'xs';

  const exploreMode = useSelector(
    ({ playback }) => playback.mode === 'closest',
  );
  const track = useSelector(({ playback }) => playback.track);
  const active = useSelector(({ app }) => app.drawer === 'nearby');

  const onPlay = (id) => (ev) => {
    ev.stopPropagation();
    dispatch({ type: 'playTrack', payload: id });
    onView(id, true)(ev);
  };

  const onEnter = (id) => () => setHover(id);
  const onEntered = () => {
    if (track && listRef.current) {
      const ele = listRef.current.querySelector(`.list-item-${track}`);
      ele?.scrollIntoView?.(
        scrollOptsSupported ? { behaviour: 'smooth' } : true,
      );
    }
  };
  const onLeave = (id) => () => id === hover && setHover(null);
  const onClearHover = () => setHover(null);

  return (
    <Collapse in={active} onEntered={onEntered}>
      <List ref={listRef} data-help="playlist">
        {data.map((item) => (
          <ListItem
            {...item}
            docId={item.id}
            disabled={!map}
            key={item.id}
            className={`list-item-${item.id}`}
            variant="list"
            onPlay={exploreMode ? onPlay(item.id) : null}
            onView={onView(item.id, noClose)}
            hover={item.id === hover}
            onEnter={exploreMode ? onEnter(item.id) : null}
            onLeave={exploreMode ? onLeave(item.id) : null}
            onClearHover={exploreMode ? onClearHover : null}
          />
        ))}
      </List>
    </Collapse>
  );
};

Nearby.displayName = 'ListNearby';
Nearby.propTypes = {
  sx: object,
  map: object,
  data: arrayOf(shape({ id: string })),
};

export default Nearby;
