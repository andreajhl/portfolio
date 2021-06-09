import { MutableRefObject, useEffect, useState } from "react";
import debounce from "lodash.debounce";

function useElementWidth(
  elementRef: MutableRefObject<HTMLElement>,
  defaultWidth: number,
  updateTimeout: number = 500
): number {
  const [elementWidth, setElementWidth] = useState(defaultWidth);

  function updateElementWidth() {
    if (!elementRef.current) return;
    if (!elementRef.current.offsetWidth) return;
    setElementWidth(elementRef.current.offsetWidth);
  }

  useEffect(() => {
    updateElementWidth();
    const debouncedUpdateElementWidth = debounce(
      updateElementWidth,
      updateTimeout
    );
    window.addEventListener("resize", debouncedUpdateElementWidth);
    return () => {
      window.removeEventListener("resize", debouncedUpdateElementWidth);
    };
  }, []);

  return elementWidth;
}

export default useElementWidth;
