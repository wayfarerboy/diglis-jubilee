import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import localforage from 'localforage';

const useLocalStorage = (key, defaultValue) => {
  const dispatch = useDispatch();
  const item = useSelector(({ localStorage }) => localStorage[key]);

  const onSet = (value, opts = {}) => {
    let newValue = value;
    if (opts.merge) newValue = { ...item, ...value };
    dispatch({ type: 'setLocalStorage', payload: { key, value: newValue } });
    return localforage.setItem(key, newValue);
  };

  const onRemove = () => localforage.removeItem(key);

  useEffect(() => {
    (async () => {
      const newItem = await localforage.getItem(key);
      if (typeof newItem === 'undefined') {
        await onSet(defaultValue);
      } else {
        dispatch({ type: 'setLocalStorage', payload: { key, value: newItem } });
      }
    })();
  }, [defaultValue, key]);

  return [item, onSet, onRemove];
};

export default useLocalStorage;
