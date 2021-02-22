import getWindow from "./getWindow";
import useIsInBrowser from "./useIsInBrowser";

export const useWindow = () => {
  const isInBrowser = useIsInBrowser();
  return isInBrowser ? window : getWindow();
};
