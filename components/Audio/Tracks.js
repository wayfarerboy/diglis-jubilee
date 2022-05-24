/* global MediaMetadata */
import React, { useEffect, useState } from 'react';
import { arrayOf } from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import useLocalStorage from '../../hooks/useLocalStorage';
import { triggerDistance } from '../../helpers/geolocation';
import { dataItem } from '../../helpers/propTypes';
import usePlaylist from '../../hooks/usePlaylist';
import Track from './Track';

const generateSrc = ({ image, width }) => {
  const src = new URL(`${window.location.origin}/_next/image`);
  src.searchParams.set('url', image);
  src.searchParams.set('w', width);
  src.searchParams.set('q', 75);
  return src.toString();
};

const artworkSizes = [96, 128, 192, 256, 384, 512];

const generateArtwork = (image) =>
  artworkSizes.map((width) => ({
    src: generateSrc({ width, image }),
    sizes: `${width}x${width}`,
    type: 'image/jpg',
  }));

const generateMetadata = (item) => {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: item.title,
    artist: item.author,
    album: 'Diglis Jubilee Memories',
    artwork: generateArtwork(item.image),
  });
};

const Tracks = ({ played: _played, data = [] }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState([]);
  const muted = useSelector(({ playback }) => playback.muted);
  const track = useSelector(({ playback }) => playback.track);
  const mode = useSelector(({ playback }) => playback.mode);
  const [played, onSetHistory] = useLocalStorage('played', [], _played);

  const tracks = data.filter(({ howler, id }) => howler && active.includes(id));
  const [item, next] = usePlaylist(data);

  const onPlay = () => {
    if ('mediaSession' in navigator) generateMetadata(item);
    dispatch({ type: 'setPlaying', payload: true });
  };

  const onPause = () => {
    dispatch({ type: 'setPlaying', payload: false });
  };

  const onStop = (id) => {
    if (track === id) {
      onSetHistory(
        [...played, id].filter((val, i, arr) => arr.indexOf(val) === i),
      );
      if (next) {
        dispatch({ type: 'playTrack', payload: next.id });
      } else {
        dispatch({ type: 'setPlaying', payload: false });
      }
    } else {
      dispatch({ type: 'setPlaying', payload: false });
    }
  };

  const onError = (err) => {
    dispatch({
      type: 'addMessage',
      payload: { severity: 'error', duration: 6000, message: err.message },
    });
  };

  useEffect(() => {
    if (track && !active.includes(track)) {
      setActive([track]);
    } else if (!track && active.length) {
      setActive([]);
    }
  }, [active, track, setActive]);

  useEffect(() => {
    if (mode === 'moving') {
      const nearby = data.filter(
        ({ distanceValue }) => distanceValue <= triggerDistance,
      );
      if (
        track !== 'introduction' &&
        ((!track && nearby[0]?.id) || (track && track !== nearby[0]?.id))
      ) {
        if (nearby[0]?.id) {
          dispatch({ type: 'playTrack', payload: nearby[0]?.id });
        } else {
          dispatch({ type: 'playTrack', payload: null });
        }
      }
    }
  }, [data, mode, track]);

  if (!data.length || !data[0]?.audio) return null;

  return (
    <>
      {tracks.map(({ id, howler, audio }) => (
        <Track
          key={id}
          isIntro={id === 'introduction'}
          src={audio}
          docId={id}
          audioRef={howler}
          onPlay={onPlay}
          onPause={onPause}
          onStop={onStop}
          onError={onError}
          muted={muted}
          active={track === id}
        />
      ))}
    </>
  );
};

Tracks.displayName = 'AudioTracks';
Tracks.propTypes = {
  data: arrayOf(dataItem),
};

export default Tracks;
