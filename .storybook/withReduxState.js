import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const withReduxState = (queueSet, Component) => {
  const Wrapper = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
      queueSet.forEach((p) => {
        const { type, payload, delay = 0 } = p;
        setTimeout(() => dispatch({ type, payload }), delay);
      });
    }, []);
    return <Component {...props} />;
  };
  Wrapper.displayName = 'withReduxState';
  return Wrapper;
};

export default withReduxState;
