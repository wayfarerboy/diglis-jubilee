import { useEffect } from 'react';
import { object, string } from 'prop-types';
import { Howl } from 'howler';

const Track = ({ src, audioRef, onPlay, onPause, onStop, onError, muted }) => {
  const onInit = () => {
    audioRef.current = new Howl({
      src,
      html5: true,
      mute: muted,
      onplay: onPlay,
      onpause: onPause,
      onend: onStop,
      onerror: onError,
    });
    audioRef.current.play();
    return () => {
      audioRef.current.unload();
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
