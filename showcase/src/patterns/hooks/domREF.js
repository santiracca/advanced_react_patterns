import { useState, useCallback } from "react";

const useDOMRef = () => {
  const [DOMRef, setRefs] = useState({});

  const setRef = useCallback((node) => {
    setRefs((prevRefs) => ({
      ...prevRefs,
      [node.dataset.refkey]: node,
    }));
  }, []);
  return [DOMRef, setRef];
};

export default useDOMRef;
