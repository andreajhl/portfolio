import { useState } from "react";

const useLoad = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const onLoad = () => setIsLoaded(true);
  return [isLoaded, onLoad];
};

export default useLoad;
