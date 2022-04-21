import Dialog from '@mui/material/Dialog';

export const steps = [
  {
    id: 'intro',
    component: Dialog,
    title: 'Welcome to Diglis Jubilee Memories',
    body: `If you're a first time visitor we recommed you run through the guide
          to get the most out of our community history project.`,
  },
  {
    id: 'map',
    body: `The map panel shows the location of all of the memories of Diglis.
          You can select a marker to show the details of each memory.`,
    before: [{ type: 'setMapMode', payload: 'map' }],
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    transformOrigin: { horizontal: 'center', vertical: 'top' },
  },
  {
    id: 'player',
    body: `The Player panel shows the currently playing memory.`,
    before: [{ type: 'setMapMode', payload: 'track' }],
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    transformOrigin: { horizontal: 'center', vertical: 'top' },
  },
  {
    id: 'controls',
    body: `These buttons control playback and toggle between the two playback modes...`,
    before: [{ type: 'setMapMode', payload: 'track' }],
    anchorOrigin: { horizontal: 'center', vertical: 'top' },
    transformOrigin: { horizontal: 'center', vertical: 'bottom' },
  },
  {
    id: 'moving',
    before: [
      { type: 'openRepeatMenu' },
      { type: 'setMapMode', payload: 'track' },
    ],
    after: [{ type: 'closeRepeatMenu' }],
    pause: 350,
    body: `Tour Guide Mode automatically plays memories when they are
    nearby.`,
    caption: `You must be in or around Diglis to switch this mode on.`,
    anchorOrigin: { horizontal: 'center', vertical: 'top' },
    transformOrigin: { horizontal: 'center', vertical: 'bottom' },
  },
  {
    id: 'closest',
    before: [
      { type: 'openRepeatMenu' },
      { type: 'setMapMode', payload: 'track' },
    ],
    after: [{ type: 'closeRepeatMenu' }],
    pause: 350,
    body: `Explore Mode waits for you to choose a memory to play.`,
    anchorOrigin: { horizontal: 'center', vertical: 'top' },
    transformOrigin: { horizontal: 'center', vertical: 'bottom' },
  },
  {
    id: 'playlist',
    body: `The Playlist panel shows the nearest memories to you, ordered by
          distance.`,
    before: [{ type: 'setAppDrawer', payload: 'nearby' }],
    anchorOrigin: { horizontal: 'center', vertical: 'top' },
    transformOrigin: { horizontal: 'center', vertical: 'bottom' },
  },
  {
    id: 'navigation',
    body: `Pressing the navigation icon highlights its location on
          the map.`,
    before: [{ type: 'setAppDrawer', payload: 'nearby' }],
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    transformOrigin: { horizontal: 'center', vertical: 'top' },
  },
  {
    id: 'details',
    body: `Pressing the info icon shows extended details of the memory.`,
    before: [{ type: 'setAppDrawer', payload: 'nearby' }],
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    transformOrigin: { horizontal: 'center', vertical: 'top' },
  },
  {
    id: 'listitem',
    body: 'In Explore Mode, pressing the artwork or title will play the memory.',
    before: [{ type: 'setAppDrawer', payload: 'nearby' }],
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    transformOrigin: { horizontal: 'center', vertical: 'top' },
  },
  {
    id: 'miniplayer',
    body: 'Pressing the currently playing track will return you to the Player panel.',
    before: [{ type: 'setAppDrawer', payload: 'nearby' }],
    after: [
      { type: 'setMapMode', payload: 'track' },
      { type: 'setAppDrawer', payload: null },
    ],
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    transformOrigin: { horizontal: 'center', vertical: 'top' },
  },
  {
    id: 'help',
    body: 'You can revisit any part of this guide from the Help panel.',
    pause: 350,
    before: [{ type: 'setAppDrawer', payload: 'help' }],
    anchorOrigin: { horizontal: 'center', vertical: 'bottom' },
    transformOrigin: { horizontal: 'center', vertical: 'top' },
  },
];
