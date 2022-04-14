/* global Promise */
import { useMemo, useState, useRef, useEffect, useCallback } from 'react';

const canTrack = typeof navigator === 'object' && !!navigator.geolocation;

const useGeolocation = ({
  trackNow = true,
  onPosition: onPos,
  onError: onErr,
  accurate = true,
} = {}) => {
  const watchId = useRef(null);
  const [isTracking, setTracking] = useState(false);
  const [position, setPosition] = useState();
  const [accuracy, setAccuracy] = useState();
  const [error, setError] = useState();
  const opts = useMemo(
    () => ({
      enableHighAccuracy: !!accurate,
      maximumAge: !accurate ? Infinity : 0,
    }),
    [accurate],
  );

  const onPosition = useCallback(
    ({ coords, timestamp }, res) => {
      const p = {
        lat: coords.latitude,
        lng: coords.longitude,
        timestamp,
      };
      setPosition(p);
      setAccuracy(coords.accuracy);
      if (onPos) onPos(p);
      if (res) {
        res({
          position: p,
          accuracy: coords.accuracy,
        });
      }
    },
    [setPosition, setAccuracy, onPos],
  );

  const onError = useCallback(
    (err, rej) => {
      setError(err.message);
      if (onErr) onErr(err.message);
      if (rej) rej(err);
    },
    [setError, onErr],
  );

  const onGetPosition = (callback) =>
    new Promise((res, rej) => {
      if (!canTrack) {
        rej({
          message: 'Unable to retrieve current location',
        });
      } else {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            onPosition(pos, res);
            callback?.(null, pos);
          },
          (err) => {
            onError(err, rej);
            callback?.(err);
          },
          opts,
        );
      }
    });

  const onWatchPosition = useCallback(() => {
    if (!canTrack) setError('Unable to retrieve current location');
    setTracking(true);
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => onPosition(pos),
      (err) => onError(err),
      opts,
    );
  }, [opts, onPosition, onError]);

  const onClearWatch = () => {
    setTracking(false);
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
    }
  };

  useEffect(() => {
    if (trackNow) return onWatchPosition();
  }, [trackNow, onWatchPosition]);

  return {
    position,
    error,
    onGetPosition,
    onWatchPosition,
    onClearWatch,
    isTracking,
    accuracy,
  };
};

export default useGeolocation;
