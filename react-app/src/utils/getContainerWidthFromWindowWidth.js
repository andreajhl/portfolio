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
  if (windowWidth >= extraLargeBreakPoint) {
    return containerExtraLargeSize;
  } else if (windowWidth >= largeBreakPoint) {
    return containerLargeSize;
  } else if (windowWidth >= mediumBreakpoint) {
    return containerMediumSize;
  } else if (windowWidth >= smallBreakpoint) {
    return containerSmallSize;
  }
  return windowWidth;
};

export default getContainerWidthFromWindowWidth;
