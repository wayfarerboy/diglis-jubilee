import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Wrapper = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => () => dispatch({ type: 'RESET_APP' }));
  return children;
};

Wrapper.displayName = 'StoryWrapper';

export default Wrapper;
