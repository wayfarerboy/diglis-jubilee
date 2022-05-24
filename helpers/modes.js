import AutoAwesome from '@mui/icons-material/AutoAwesome';
import List from '@mui/icons-material/List';

export const modes = {
  moving: {
    Icon: AutoAwesome,
    label: 'Tour guide mode',
    description: 'Play only when near',
    body: `Start this mode while walking through Diglis. Tracks will auto-play when you approach markers on the map.`,
  },
  closest: {
    Icon: List,
    label: 'Playlist mode',
    description: 'Play in any order',
    body: `Use this mode to play any track you wish. Best used when you are away from the Diglis area.`,
  },
};

export const modeList = Object.keys(modes).map((id) => ({ id, ...modes[id] }));
