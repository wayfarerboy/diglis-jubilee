import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import localforage from 'localforage';

const useLocalStorage = (key, defaultValue, testValue) => {
  const dispatch = useDispatch();
  const [inited, setInited] = useState(false);
  const item = useSelector(({ localStorage }) => localStorage[key]);

  const onSet = (value, opts = {}) => {
    let newValue = value;
    if (opts.merge) newValue = { ...item, ...value };
    dispatch({ type: 'setLocalStorage', payload: { key, value: newValue } });
    return localforage.setItem(key, newValue);
  };

  const onRemove = () => localforage.removeItem(key);

  useEffect(() => {
    if (!inited) {
      setInited(true);
      (async () => {
        const newItem = await localforage.getItem(key);
        if (!newItem && newItem !== 0 && newItem !== false) {
          dispatch({
            type: 'setLocalStorage',
            payload: { key, value: defaultValue },
          });
          await localforage.setItem(key, defaultValue);
        } else {
          dispatch({
            type: 'setLocalStorage',
            payload: { key, value: newItem },
          });
        }
      })();
    }
  }, [inited, setInited]);

  return [testValue || item, onSet, onRemove];
};

export default useLocalStorage;
