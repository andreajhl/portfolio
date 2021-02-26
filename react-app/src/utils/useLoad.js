import { useState, useEffect } from "react";

const defaultItemRef = { current: { readyState: 0 } };
const LOADED = 4;

const useLoad = (itemRef = defaultItemRef, defaultIsLoaded = false) => {
  const [isLoaded, setIsLoaded] = useState(defaultIsLoaded);
  const onLoad = () => setIsLoaded(true);

  useEffect(() => {
    if (itemRef.current.readyState !== LOADED) return;
    onLoad();
  }, [itemRef]);

  return [isLoaded, onLoad];
};

export default useLoad;
