import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import MobileStepper from '@mui/material/MobileStepper';

import useWidth from '../../hooks/useWidth';
import Backdrop from './Backdrop';
import { steps as _steps } from '../../helpers/help';

const Onboarding = () => {
  const width = useWidth();
  const dispatch = useDispatch();
  const open = useSelector(({ onboarding }) => onboarding.show);
  const [anchor, setAnchor] = useState();
  const step = useSelector(({ onboarding }) => onboarding.step);
  const [nextStep, setNextStep] = useState();

  const steps = _steps.filter(({ filter }) => !filter || filter({ width }));

  const {
    title,
    body,
    caption,
    component: Component = Popover,
    after,
    anchorOrigin,
    transformOrigin,
  } = step > -1 ? steps[step] : {};

  const onClose = (nextStep) => () => {
    if (nextStep === false) {
      setNextStep(false);
    } else {
      const s = step + nextStep;
      if (s > -1 && s < steps.length) setNextStep(s);
    }
    dispatch({ type: 'closeOnboarding' });
  };

  const onExited = () => {
    if (nextStep !== false) {
      const { id, before, component, pause } = steps[nextStep] || {};
      if (after) after.forEach((opts) => dispatch(opts));
      if (before) before.forEach((opts) => dispatch(opts));
      if (!component) {
        let interval = setInterval(() => {
          const ele = document.querySelector(`[data-help="${id}"]`);
          if (ele) {
            setAnchor(ele);
            setTimeout(() => {
              dispatch({ type: 'openOnboarding', payload: nextStep });
            }, pause);
            clearInterval(interval);
          }
        }, 150);
      } else {
        dispatch({ type: 'openOnboarding', payload: nextStep });
      }
    }
  };

  return (
    <Component
      open={open && (Component !== Popover || !!anchor)}
      onClose={onClose(false)}
      disablePortal
      TransitionProps={{ onExited }}
      sx={{
        zIndex: 'tooltip',
        '.MuiPaper-root': { width: 240 },
      }}
      {...(Component === Popover
        ? {
            BackdropComponent: Backdrop,
            BackdropProps: {
              onClick: onClose(false),
              invisible: false,
              show: true,
              target: open && anchor,
            },
            anchorEl: anchor,
            transformOrigin,
            anchorOrigin,
          }
        : {})}
    >
      {title && (
        <Typography variant="h6" sx={{ m: 2 }}>
          {title}
        </Typography>
      )}
      <Typography variant="body2" sx={{ m: 2, mt: title ? 0 : 2 }}>
        {body}
      </Typography>
      {caption && (
        <Typography variant="caption" sx={{ display: 'block', m: 2, mt: 0 }}>
          {caption}
        </Typography>
      )}
      <MobileStepper
        variant="text"
        steps={steps.length}
        position="static"
        activeStep={step}
        backButton={
          step > 0 ? (
            <Button onClick={onClose(-1)} size="small">
              Back
            </Button>
          ) : (
            <Button onClick={onClose(false)} size="small">
              Close
            </Button>
          )
        }
        nextButton={
          step < steps.length - 1 ? (
            <Button onClick={onClose(1)} size="small" variant="contained">
              Next
            </Button>
          ) : (
            <Button onClick={onClose(false)} size="small" variant="contained">
              Done
            </Button>
          )
        }
      />
    </Component>
  );
};

Onboarding.displayName = 'Onboarding';

export default Onboarding;
