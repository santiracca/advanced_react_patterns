import { useState, useCallback } from "react";

const INITIAL_STATE = {
  count: 0,
  countTotal: 268,
  isClicked: false,
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

  return [clapState, updateClapState];
};

export default useClapState;
