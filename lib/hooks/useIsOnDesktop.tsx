import useGetViewportWidthOnResize from "react-app/src/utils/useGetViewportWidthOnResize";

function useIsOnDesktop() {
  const windowWidth = useGetViewportWidthOnResize();
  return windowWidth >= 1024;
}

export default useIsOnDesktop;
