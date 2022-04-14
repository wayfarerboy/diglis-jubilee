import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const withReduxState = (queueSet, Component) => props => {
  const dispatch = useDispatch();
  useEffect(() => {
    queueSet.forEach(dispatch);
  }, []);
  return <Component {...props} />;
};

export default withReduxState;
