import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import getWindow from "./getWindow";

const useGetViewportWidthOnResize = (updateTimeout = 500) => {
  const [windowWidth, setWindowWidth] = useState(getWindow().innerWidth);

  useEffect(() => {
    const updateSize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (!windowWidth) updateSize();

    const debouncedUpdateSize = debounce(updateSize, updateTimeout);

    window.addEventListener("resize", debouncedUpdateSize);

    return () => {
      window.removeEventListener("resize", debouncedUpdateSize);
    };
  }, []);

  return windowWidth;
};

export default useGetViewportWidthOnResize;
