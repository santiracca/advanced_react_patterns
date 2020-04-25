import { useState, useCallback, useRef, useReducer } from "react";
import usePrevious from "./getPrevious";

const INITIAL_STATE = {
  count: 0,
  countTotal: 268,
  isClicked: false,
};

const MAXIMUM_USER_CLAP = 50;

const callFnsInSequence = (...fns) => (...args) => {
  fns.forEach((fn) => fn && fn(...args));
};

const reducer = ({ count, countTotal }, { type, payload }) => {
  switch (type) {
    case "clap":
      return {
        isClicked: true,
        count: Math.min(count + 1, MAXIMUM_USER_CLAP),
        countTotal: count < MAXIMUM_USER_CLAP ? countTotal + 1 : countTotal,
      };
    case "reset":
      return payload;
    default:
      return state;
  }
};
const useClapState = (initialState = INITIAL_STATE) => {
  const [clapState, dispatch] = useReducer(reducer, initialState);

  const updateClapState = useCallback(() => {
    dispatch({ type: "clap" });
  }, []);

  // props collection for 'click'
  const getTogglerProps = ({ onClick, ...otherProps } = {}) => ({
    handleClick: callFnsInSequence(updateClapState, onClick),
    "aria-pressed": clapState.isClicked,
    ...otherProps,
  });

  const resetRef = useRef(0);
  const prevCount = usePrevious(clapState.count);
  const reset = useCallback(() => {
    if (prevCount !== clapState.count) {
      dispatch({ type: "reset", payload: initialState });
      resetRef.current++;
    }
  }, [prevCount, clapState.count]);

  // props collection from 'count'
  const getCounterProps = ({ ...otherProps }) => ({
    count: clapState.count,
    "aria-valuemax": MAXIMUM_USER_CLAP,
    "aria-valuemin": 0,
    "aria-valuenow": clapState.count,
    ...otherProps,
  });
  return {
    clapState,
    updateClapState,
    getTogglerProps,
    getCounterProps,
    reset,
    resetDep: resetRef.current,
  };
};

export default useClapState;
