import { useSelector } from 'react-redux';

const usePlaylist = (data) => {
  const isMoving = useSelector(({ playback }) => playback.mode === 'moving');
  const playId = useSelector(({ playback }) => playback.track);
  const item = playId ? data.find(({ id }) => id === playId) : {};
  const playIndex = data.findIndex(({ id }) => item?.id === id);
  const nextTrack =
    (!isMoving && playIndex > 0 && data[playIndex + 1]) || false;
  const prevTrack = (!isMoving && playIndex > 1) || false;
  return [item, nextTrack, prevTrack];
};

export default usePlaylist;
