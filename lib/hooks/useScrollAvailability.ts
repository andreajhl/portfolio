import { MutableRefObject, useEffect, useState } from "react";
import debounce from "lodash.debounce";

type ElementType = HTMLElement;
type DirectionType = "vertical" | "horizontal";

function getElementScrollProperties(
  element: ElementType,
  direction: DirectionType
) {
  let scrollPosition: number;
  let elementSize: number;
  let scrollSize: number;

  if (element) {
    if (direction === "vertical") {
      scrollPosition = element.scrollTop;
      elementSize = element.offsetHeight;
      scrollSize = element.scrollHeight;
    } else {
      scrollPosition = element.scrollLeft;
      elementSize = element.offsetWidth;
      scrollSize = element.scrollWidth;
    }
  }

  return {
    scrollPosition,
    elementSize,
    scrollSize,
  };
}

function useScrollAvailability(
  elementRef: MutableRefObject<ElementType>,
  direction: DirectionType
) {
  const [canScrollBackwards, setCanScrollBackwards] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const setScrollAvailability = debounce(() => {
    if (!elementRef.current) return;
    const {
      scrollPosition,
      elementSize,
      scrollSize,
    } = getElementScrollProperties(elementRef.current, direction);
    setCanScrollBackwards(scrollPosition !== 0);
    setCanScrollForward(scrollPosition + elementSize !== scrollSize);
  }, 100);

  useEffect(() => {
    if (!elementRef.current) return;
    const { elementSize, scrollSize } = getElementScrollProperties(
      elementRef.current,
      direction
    );
    setCanScrollForward(scrollSize > elementSize);
  }, []);

  return [setScrollAvailability, canScrollBackwards, canScrollForward] as const;
}

export default useScrollAvailability;
