import { useEffect, useRef } from 'react';
import { object, string } from 'prop-types';
import { Howl } from 'howler';
import { useSelector } from 'react-redux';

import { fadeOut, fadeIn } from '../../helpers/audio';

const Track = ({ src, audioRef, onPlay, onPause, onStop, onError, muted }) => {
  const tmout = useRef(null);
  const moving = useSelector(({ playback }) => playback.mode === 'moving');
  const onInit = () => {
    if (moving) clearTimeout(tmout.current);
    audioRef.current = new Howl({
      src,
      html5: true,
      mute: muted,
      onplay: onPlay,
      onpause: onPause,
      onend: onStop,
      onerror: onError,
      volume: 0,
    });
    if (moving) {
      fadeIn(audioRef);
    } else {
      audioRef.current.play();
    }
    return () => {
      let timer = 0;
      if (moving) {
        clearTimeout(tmout.current);
        timer = fadeOut(audioRef);
      }
      tmout.current = setTimeout(() => {
        audioRef.current.unload();
      }, timer);
    };
  };

  useEffect(() => {
    audioRef.current?.mute(muted);
  }, [muted]);

  useEffect(() => {
    return onInit();
  }, []);

  return null;
};

Track.displayName = 'AudioTrack';
Track.propTypes = {
  title: string,
  sx: object,
};

export default Track;
