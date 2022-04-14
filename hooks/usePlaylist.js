import { useSelector } from 'react-redux';

const usePlaylist = (data) => {
  const playId = useSelector(({ playback }) => playback.track);
  const item = playId ? data.find(({ id }) => id === playId) : {};
  const nextTrack =
    (playId && data[data.findIndex(({ id }) => item.id === id) + 1]) || false;
  const prevTrack =
    (playId && data[data.findIndex(({ id }) => item.id === id) - 1]) || false;
  return [item, nextTrack, prevTrack];
};

export default usePlaylist;
