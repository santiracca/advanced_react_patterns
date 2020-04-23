import { useEffect, useRef } from "react";

const useEffectAfterMount = (cb, dependencies) => {
  const componentJustMounted = useRef(true);
  useEffect(() => {
    if (!componentJustMounted.current) {
      return cb();
    }
    componentJustMounted.current = false;
  }, dependencies);
};

export default useEffectAfterMount;
