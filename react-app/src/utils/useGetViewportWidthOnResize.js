import { useState, useEffect } from "react";
import debounce from "lodash.debounce";

const useGetViewportWidthOnResize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const updateSize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", debounce(updateSize, 500));
  }, []);

  return windowWidth;
};

export default useGetViewportWidthOnResize;
