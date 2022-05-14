import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import { arrayOf, string, shape, object } from 'prop-types';
import { useDispatch } from 'react-redux';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';

import useConfirm from '../../hooks/useConfirm';
import useLocalStorage from '../../hooks/useLocalStorage';
import useWidth from '../../hooks/useWidth';
import ListItem from './ListItem';

const scrollOptsSupported =
  'scrollBehavior' in (document?.documentElement.style || {});

const Nearby = ({ data = [], map, onView, played: _played }) => {
  const listRef = useRef(null);
  const [hover, setHover] = useState();
  const width = useWidth();
  const dispatch = useDispatch();
  const noClose = width !== 'xs';
  const confirm = useConfirm({ okLabel: 'Clear', color: 'warning' });

  const exploreMode = useSelector(
    ({ playback }) => playback.mode === 'closest',
  );
  const track = useSelector(({ playback }) => playback.track);
  const active = useSelector(({ app }) => app.drawer === 'nearby');
  const [played, onSetHistory] = useLocalStorage('played', [], _played);

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

  const onClearHistory = async () => {
    await confirm('Are you sure you want to clear played memories?');
    await onSetHistory([]);
  };

  return (
    <Collapse in={active} onEntered={onEntered}>
      <List ref={listRef} data-help="playlist">
        {!!played?.length && (
          <ListSubheader sx={{ textAlign: 'right' }}>
            <Button
              size="small"
              onClick={onClearHistory}
              variant="outlined"
              color="inherit"
              sx={{
                px: 1,
                py: 0.5,
                typography: 'caption',
                textTransform: 'uppercase',
                borderRadius: 1.5,
              }}
            >
              Clear played
            </Button>
          </ListSubheader>
        )}
        {data
          .filter((item) => item.latlng)
          .map((item) => (
            <ListItem
              {...item}
              docId={item.id}
              disabled={!map}
              played={played?.includes(item.id)}
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
  played: arrayOf(string),
};

export default Nearby;
