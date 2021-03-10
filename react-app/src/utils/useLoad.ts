import { useState, useEffect } from "react";

const defaultItemRef = { current: { readyState: 0, complete: false } };
const LOADED = 4;

const useLoad = (itemRef = defaultItemRef, defaultIsLoaded = false) => {
  const [isLoaded, setIsLoaded] = useState(defaultIsLoaded);
  const onLoad = () => setIsLoaded(true);

  useEffect(() => {
    if (itemRef.current.readyState === LOADED || itemRef.current.complete) {
      onLoad();
    }
  }, [itemRef]);

  return [isLoaded, onLoad] as const;
};

export default useLoad;
