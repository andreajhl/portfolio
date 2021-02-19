import {
  smallBreakpoint,
  mediumBreakpoint,
  largeBreakPoint,
  extraLargeBreakPoint
} from "../constants/bootstrapBreakpoint";
import {
  containerSmallSize,
  containerMediumSize,
  containerLargeSize,
  containerExtraLargeSize
} from "../constants/bootstrapContainerSize";

const getContainerWidthFromWindowWidth = (windowWidth) => {
  if (windowWidth < smallBreakpoint) {
    return windowWidth;
  } else if (
    windowWidth >= smallBreakpoint &&
    windowWidth <= mediumBreakpoint
  ) {
    return containerSmallSize;
  } else if (
    windowWidth >= mediumBreakpoint &&
    windowWidth <= largeBreakPoint
  ) {
    return containerMediumSize;
  } else if (
    windowWidth >= largeBreakPoint &&
    windowWidth <= extraLargeBreakPoint
  ) {
    return containerLargeSize;
  }
  return containerExtraLargeSize;
};

export default getContainerWidthFromWindowWidth;
