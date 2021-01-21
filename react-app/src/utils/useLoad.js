import { useState } from "react";

const useLoad = (defaultIsLoaded = false) => {
  const [isLoaded, setIsLoaded] = useState(defaultIsLoaded);
  const onLoad = () => setIsLoaded(true);
  return [isLoaded, onLoad];
};

export default useLoad;
