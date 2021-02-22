import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import { CelebrityMainVideoSection } from "../main-video-section";
import useGetViewportWidthOnResize from "react-app/src/utils/useGetViewportWidthOnResize";
import getContainerWidthFromWindowWidth from "../../../utils/getContainerWidthFromWindowWidth";
import { largeBreakPoint } from "../../../constants/bootstrapBreakpoint";
import "react-resizable/css/styles.css";

const getWidthForDesktop = (windowWidth) => {
  const fourthPartOfViewport = windowWidth * 0.25;
  const minimumWidth = 370;
  return fourthPartOfViewport >= minimumWidth
    ? minimumWidth
    : fourthPartOfViewport;
};

const ResizableMainVideo = ({ mainVideoUrl, videoPosterUrl }) => {
  const windowWidth = useGetViewportWidthOnResize();
  const [isInDesktop, setIsInDesktop] = useState(false);

  const containerWidth = isInDesktop
    ? getWidthForDesktop(windowWidth)
    : getContainerWidthFromWindowWidth(windowWidth);

  useEffect(() => {
    setIsInDesktop(windowWidth > largeBreakPoint);
  }, [windowWidth]);

  return (
    <ResizableBox
      width={containerWidth || 400}
      height={isInDesktop ? 445 : 252}
      minConstraints={[containerWidth, 252]}
      maxConstraints={[containerWidth, 445]}
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
