import { checkCookie } from "lib/utils/checkCookiesEnabled";
import useIsInBrowser from "react-app/src/utils/useIsInBrowser";

function useHasCookiesEnabled() {
  const isInBrowser = useIsInBrowser();

  return isInBrowser && checkCookie();
}

export default useHasCookiesEnabled;
