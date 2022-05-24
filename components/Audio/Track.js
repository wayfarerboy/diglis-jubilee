import { useCallback, useEffect, useRef } from 'react';
import { bool, func, shape, object, string } from 'prop-types';
import { Howl } from 'howler';
import { useSelector } from 'react-redux';

import { fadeOut, fadeIn } from '../../helpers/audio';

const Track = ({
  isIntro,
  src,
  audioRef,
  onPlay,
  onPause,
  onStop: stop,
  onError,
  muted,
  docId,
}) => {
  const tmout = useRef(null);
  const moving = useSelector(({ playback }) => playback.mode === 'moving');
  const onStop = useCallback(() => stop(docId), [stop]);
  const isIos = useSelector(({ app }) => app.isIos);
  const onInit = () => {
    if (src) {
      if (moving) clearTimeout(tmout.current);
      audioRef.current = new Howl({
        src,
        html5: !isIos,
        mute: muted,
        onplay: onPlay,
        onpause: onPause,
        onend: onStop,
        onerror: onError,
        volume: isIntro ? 1 : 0,
      });
      if (moving) {
        fadeIn(audioRef);
      } else {
        audioRef.current.play();
        audioRef.current.volume(1);
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
    }
  };

  useEffect(() => {
    audioRef?.current?.mute(muted);
  }, [muted]);

  useEffect(() => {
    if (!audioRef?.current || audioRef.current.state() === 'unloaded')
      return onInit();
  }, []);

  return null;
};

Track.displayName = 'AudioTrack';
Track.propTypes = {
  isIntro: bool,
  src: string,
  audioRef: shape({ current: object }),
  onPlay: func,
  onPause: func,
  onStop: func,
  onError: func,
  muted: bool,
};

export default Track;
