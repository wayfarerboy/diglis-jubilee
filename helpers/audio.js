export const isAudioLocked = () =>
  new Promise((resolve) => {
    const checkHTML5Audio = async () => {
      const audio = new Audio();
      try {
        audio.play();
        resolve(false);
      } catch (err) {
        resolve(true);
      }
    };
    try {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      resolve(context.state === 'suspended');
    } catch (e) {
      checkHTML5Audio();
    }
  });

const fadeDuration = 4000;

export const fadeOut = ({ current: audio }) => {
  if (!audio) return 0;
  const volume = audio.volume();
  const timer = fadeDuration * volume;
  console.log('fade out from', volume, 'over', timer, 'ms');
  audio.fade(volume, 0, timer);
  return timer;
};

export const fadeIn = ({ current: audio }) => {
  if (!audio) return 0;
  const volume = audio.volume();
  const timer = fadeDuration * (1 - volume);
  console.log('fade in from', volume, 'over', timer, 'ms');
  audio.play();
  audio.fade(volume, 1, timer);
  return timer;
};
