import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Bowser from 'bowser';

let browser;
let desktop;
let mobile;
let isIos;
let isApple;

try {
  browser = Bowser.parse(window.navigator.userAgent);
  desktop =
    browser.platform.type === 'desktop' || browser.os.name === 'Chrome OS';
  mobile = ['tablet', 'mobile'].includes(browser.platform.type);
  isIos = mobile && browser.browser.name === 'Safari';
  isApple = browser.browser.name === 'Safari';
} catch (err) {} // eslint-disable-line

const initialState = {
  app: {
    desktop,
    drawer: null,
    isIos,
    isApple,
    menuOpen: false,
    mobile,
    mode: 'map',
    status: {},
    update: null,
    updateOpen: false,
    audioLocked: false,
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
    mode: 'map',
    detailsOpen: false,
    details: {},
    label: null,
    marker: null,
    denied: false,
    ignoreLocation: false,
  },
  onboarding: {
    step: 0,
    show: false,
  },
  playback: {
    track: null,
    mode: null,
    muted: false,
    playing: false,
    repeatOpen: false,
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
      case 'setAudioLocked':
        return { ...state, audioLocked: payload };
      default:
        return state;
    }
  },

  geolocation: (state = initialState.geolocation, { type, payload }) => {
    switch (type) {
      case 'setGeolocation':
        if (state.manual && !payload.manual) return state;
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
          // mode: 'track',
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
          detailsOpen: false,
          nearby: false,
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
      case 'resetMap':
        return initialState.map;
      default:
        return state;
    }
  },

  onboarding: (state = initialState.onboarding, { type, payload }) => {
    switch (type) {
      case 'openOnboarding':
        return { ...state, show: true, step: payload };
      case 'closeOnboarding':
        return { ...state, show: false };
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
          playing: !!payload && (state.track !== payload || state.playing),
        };
      case 'setPlaybackMode':
        return {
          ...state,
          mode: payload,
          repeatOpen: false,
        };
      case 'setCurrentTime':
        return {
          ...state,
          currentTime: payload,
        };
      case 'openRepeatMenu':
        return {
          ...state,
          repeatOpen: true,
        };
      case 'closeRepeatMenu':
        return {
          ...state,
          repeatOpen: false,
        };
      case 'toggleMute':
        return {
          ...state,
          muted: !state.muted,
        };
      case 'resetPlayer':
        return initialState.playback;
      default:
        return state;
    }
  },
});

const rootReducer = (state, action) =>
  reducers(action.type === 'RESET_APP' ? initialState : state, action);
const store = createStore(rootReducer, composeWithDevTools());

export { store, initialState };
