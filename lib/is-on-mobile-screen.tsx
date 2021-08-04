import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useGetViewportWidthOnResize from "react-app/src/utils/useGetViewportWidthOnResize";

const MIN_DESKTOP_SCREEN_WIDTH = 1024;
const isOnMobileScreenContext = createContext(null);

type IsOnMobileScreenProviderProps = {
  initialIsOnMobileScreen?: boolean;
  children: ReactNode;
};

export function IsOnMobileScreenProvider({
  initialIsOnMobileScreen = false,
  children,
}: IsOnMobileScreenProviderProps) {
  const [isOnMobileScreen, setIsOnMobileScreen] = useState(
    initialIsOnMobileScreen
  );
  const windowWidth = useGetViewportWidthOnResize();

  useEffect(() => {
    setIsOnMobileScreen(windowWidth < MIN_DESKTOP_SCREEN_WIDTH);
  }, [windowWidth]);

  return (
    <isOnMobileScreenContext.Provider value={isOnMobileScreen}>
      {children}
    </isOnMobileScreenContext.Provider>
  );
}

export function useIsOnMobileScreen() {
  const context = useContext(isOnMobileScreenContext);
  if (typeof context !== "boolean") {
    throw new Error(
      "useIsOnMobileScreen should be used within a IsOnMobileScreenProvider"
    );
  }
  return context;
}
