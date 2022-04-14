import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Bowser from 'bowser';

let browser;
let desktop;
let mobile;
let isIos;

try {
  browser = Bowser.parse(window.navigator.userAgent);
  desktop =
    browser.platform.type === 'desktop' || browser.os.name === 'Chrome OS';
  mobile = ['tablet', 'mobile'].includes(browser.platform.type);
  isIos = mobile && browser.browser.name === 'Safari';
} catch (err) {} // eslint-disable-line

const initialState = {
  app: {
    desktop,
    drawer: null,
    isIos,
    menuOpen: false,
    mobile,
    mode: 'map',
    status: {},
    update: null,
    updateOpen: false,
  },
  geolocation: {
    latlng: null,
    bearing: 0,
    denied: false,
  },
  localStorage: {},
  map: {
    center: { lat: 52.1790048, lng: -2.2205763 },
    zoom: 16,
    mode: 'track',
    detailsOpen: false,
    details: {},
    label: null,
    marker: null,
    denied: false,
    ignoreLocation: false,
  },
  playback: {
    track: null,
    mode: 'closest',
    muted: false,
    playing: false,
  },
};

const reducers = combineReducers({
  app: (state = initialState.app, { type, payload }) => {
    let newStatus;
    switch (type) {
      case 'menuOpen':
        return { ...state, menuOpen: true };
      case 'menuClose':
        return { ...state, menuOpen: false };
      case 'addMessage':
        if (typeof payload === 'string') {
          newStatus = {
            message: payload,
            duration: 3000,
            isOpen: true,
          };
        } else {
          newStatus = { ...payload, isOpen: true };
        }
        return { ...state, status: newStatus };
      case 'closeMessage':
        return { ...state, status: { ...state.status, isOpen: false } };
      case 'clearMessage':
        return { ...state, status: {} };
      case 'setAppUpdateAvailable':
        return {
          ...state,
          update: 'available',
          updateOpen: true,
        };
      case 'setAppUpdateUpdating':
        return {
          ...state,
          update: 'updating',
          updateOpen: true,
        };
      case 'setAppUpdateComplete':
        return {
          ...state,
          update: 'complete',
          updateOpen: true,
        };
      case 'setAppUpdateClosed':
        return {
          ...state,
          updateOpen: false,
        };
      case 'setAppUpdateClear':
        return {
          ...state,
          update: null,
        };
      case 'setAppHelpLoaded':
        return {
          ...state,
          helpAvailable: true,
        };
      case 'setAppOverride':
        return {
          ...state,
          ...payload,
        };
      case 'setAppDrawer':
        return {
          ...state,
          drawer: payload,
        };
      case 'setDisplayMode':
        return { ...state, mode: payload };
      default:
        return state;
    }
  },

  geolocation: (state = initialState.geolocation, { type, payload }) => {
    switch (type) {
      case 'setGeolocation':
        return {
          ...state,
          ...payload,
        };
      case 'setBearing':
        return {
          ...state,
          bearing: payload,
        };
      case 'setLocationDenied':
        return {
          ...state,
          denied: true,
        };
      default:
        return state;
    }
  },

  localStorage: (state = initialState.localStorage, { type, payload }) => {
    switch (type) {
      case 'setLocalStorage':
        return { ...state, [payload.key]: payload.value };
      default:
        return state;
    }
  },

  map: (state = initialState.map, { type, payload }) => {
    switch (type) {
      case 'setCenter':
        return {
          ...state,
          center: payload,
        };
      case 'setZoom':
        return {
          ...state,
          zoom: payload,
        };
      case 'setMarker':
        return {
          ...state,
          marker: payload,
          label: payload,
        };
      case 'setLabel':
        return {
          ...state,
          label: payload,
        };
      case 'showPlayer':
        return {
          ...state,
          detailsOpen: false,
          mode: 'track',
        };
      case 'openNearby':
        return {
          ...state,
          nearby: true,
          detailsOpen: false,
        };
      case 'closeNearby':
        return {
          ...state,
          nearby: false,
        };
      case 'setMapMode':
        return {
          ...state,
          mode: payload,
        };
      case 'openDetails':
        return {
          ...state,
          details: payload,
          detailsOpen: true,
          nearby: false,
        };
      case 'closeDetails':
        return {
          ...state,
          detailsOpen: false,
        };
      case 'clearDetails':
        return {
          ...state,
          details: {},
        };
      case 'locationDenied':
        return {
          ...state,
          denied: true,
        };
      case 'locationReset':
        return {
          ...state,
          denied: false,
        };
      case 'locationIgnore':
        return {
          ...state,
          ignoreLocation: false,
        };
      default:
        return state;
    }
  },

  playback: (state = initialState.playback, { type, payload }) => {
    switch (type) {
      case 'setPlaying':
        return {
          ...state,
          playing: payload,
        };
      case 'playTrack':
        return {
          ...state,
          track: payload,
          playing: true,
        };
      case 'setPlaybackMode':
        return {
          ...state,
          mode: payload,
        };
      case 'setCurrentTime':
        return {
          ...state,
          currentTime: payload,
        };
      case 'toggleMute':
        return {
          ...state,
          muted: !state.muted,
        };
      default:
        return state;
    }
  },
});

const rootReducer = (state, action) =>
  reducers(action.type === 'RESET_APP' ? initialState : state, action);
const store = createStore(rootReducer, composeWithDevTools());

export { store, initialState };
