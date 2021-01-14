import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import debounce from "lodash.debounce";
import { CelebrityMainVideoSection } from "../main-video-section";
import "./styles.scss";
import "react-resizable/css/styles.css";

const smallBreakpoint = 576;
const containerSmallSize = 508;
const mediumBreakpoint = 768;
const largeBreakPoint = 991;
const containerMediumSize = 688;

const getWidthFromWindowWidth = () => {
  const { innerWidth } = window;

  if (innerWidth < smallBreakpoint) {
    return innerWidth;
  } else if (innerWidth >= smallBreakpoint && innerWidth <= mediumBreakpoint) {
    return containerSmallSize;
  } else if (innerWidth >= mediumBreakpoint && innerWidth <= largeBreakPoint) {
    return containerMediumSize;
  } else {
    const newWidth = innerWidth * 0.25;
    return newWidth >= 370 ? 370 : newWidth;
  }
};

const ResizableMainVideo = ({ mainVideoUrl, videoPosterUrl }) => {
  const [windowWidth, setWindowWidth] = useState(getWidthFromWindowWidth());
  const [isInDesktop, setIsInDesktop] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setWindowWidth(getWidthFromWindowWidth());
      if (window.innerWidth >= 992) {
        setIsInDesktop(true);
      } else {
        setIsInDesktop(false);
      }
    };
    window.addEventListener("resize", debounce(updateSize, 500));
    updateSize();
  }, []);

  return (
    <ResizableBox
      width={windowWidth}
      height={isInDesktop ? 445 : 252}
      minConstraints={[windowWidth, 252]}
      maxConstraints={[windowWidth, 445]}
      axis="y"
      handle={
        <button type="button" className="btn handle-button d-lg-none">
          <img
            src="assets/img/resize-handle.svg"
            draggable={false}
            alt="resize-icon"
          />
        </button>
      }
    >
      <CelebrityMainVideoSection
        mainVideoUrl={mainVideoUrl}
        videoPosterUrl={videoPosterUrl}
      />
    </ResizableBox>
  );
};

export { ResizableMainVideo };
