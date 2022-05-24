import React from 'react';
import Button from '@mui/material/Button';
import { object, string } from 'prop-types';
import { useDispatch } from 'react-redux';

const Introduction = ({ onClick: click, children, ...props }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch({ type: 'playTrack', payload: 'introduction' });
    click?.();
  };
  return (
    <Button {...props} onClick={onClick}>
      {children}
    </Button>
  );
};

Introduction.displayName = 'Introduction';
Introduction.propTypes = {
  title: string,
  sx: object,
};

export default Introduction;
