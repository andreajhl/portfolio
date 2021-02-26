import { useEffect, useState } from "react";

const useIsInBrowser = () => {
  const [isInBrowser, setIsInBrowser] = useState(false);

  useEffect(() => {
    setIsInBrowser(true);
  }, []);

  return isInBrowser;
};

export default useIsInBrowser;
