import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { isAudioLocked } from '../helpers/audio';

const userGestureEvents = [
  'click',
  'contextmenu',
  'auxclick',
  'dblclick',
  'mousedown',
  'mouseup',
  'pointerup',
  'touchend',
  'keydown',
  'keyup',
];

const useAudioUnlocker = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unlockAudio = () => {
      dispatch({ type: 'setAudioLocked', payload: false });
      userGestureEvents.forEach((eventName) => {
        document.removeEventListener(eventName, unlockAudio);
      });
    };
    (async () => {
      if (await isAudioLocked()) {
        dispatch({ type: 'setAudioLocked', payload: true });
        userGestureEvents.forEach((eventName) => {
          document.addEventListener(eventName, unlockAudio);
        });
      }
    })();
  }, []);
};

export default useAudioUnlocker;
