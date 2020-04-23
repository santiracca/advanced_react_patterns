import { useState, useCallback } from "react";

const INITIAL_STATE = {
  count: 0,
  countTotal: 268,
  isClicked: false,
};

const callFnsInSequence = (...fns) => (...args) => {
  fns.forEach((fn) => fn && fn(...args));
};

const useClapState = (initialState = INITIAL_STATE) => {
  const MAXIMUM_USER_CLAP = 50;
  const [clapState, setClapState] = useState(initialState);

  const updateClapState = useCallback(() => {
    setClapState(({ count, countTotal }) => ({
      isClicked: true,
      count: Math.min(count + 1, MAXIMUM_USER_CLAP),
      countTotal: count < MAXIMUM_USER_CLAP ? countTotal + 1 : countTotal,
    }));
  }, [clapState.count, clapState.countTotal]);

  // props collection for 'click'
  const getTogglerProps = ({ onClick, ...otherProps } = {}) => ({
    handleClick: callFnsInSequence(updateClapState, onClick),
    "aria-pressed": clapState.isClicked,
    ...otherProps,
  });

  // props collection from 'count'
  const getCounterProps = ({ ...otherProps }) => ({
    count: clapState.count,
    "aria-valuemax": MAXIMUM_USER_CLAP,
    "aria-valuemin": 0,
    "aria-valuenow": clapState.count,
    ...otherProps,
  });
  return { clapState, updateClapState, getTogglerProps, getCounterProps };
};

export default useClapState;
