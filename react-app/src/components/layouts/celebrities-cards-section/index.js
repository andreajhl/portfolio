import React, { useState, useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import { CelebrityCardLayout } from "../celebrity-card";
import { VideoCardLayout } from "../video-card";
import "./styles.scss";
import { NavLink } from "react-router-dom";
import { CelebritiesShimmerCardsSectionLayout } from "../celebrities-shimmer-cards-section";

const initialState = {
  showLeftScrollButton: false,
  showRightScrollButton: false
};

const CelebritiesCardsSectionLayout = ({
  celebritiesSection,
  hasMoreResults,
  moreResultsPath
}) => {
  const [showLeftScrollButton, setShowLeftScrollButton] = useState(
    initialState.showLeftScrollButton
  );
  const [showRightScrollButton, setShowRightScrollButton] = useState(
    initialState.showRightScrollButton
  );

  const cardListRef = useRef(null);

  const scrollTo = (direction) => () => {
    const cardListElement = cardListRef.current;
    const { offsetWidth } = cardListElement;
    cardListElement.scrollBy({
      left: direction === "right" ? offsetWidth : offsetWidth * -1,
      behavior: "smooth"
    });
  };

  const setScrollButtonsVisibility = debounce(() => {
    const { scrollLeft, offsetWidth, scrollWidth } = cardListRef.current;
    setShowLeftScrollButton(scrollLeft !== 0);
    setShowRightScrollButton(scrollLeft + offsetWidth !== scrollWidth);
  }, 100);

  useEffect(() => {
    const cardListElement = cardListRef.current;
    setShowRightScrollButton(
      cardListElement.scrollWidth > cardListElement.offsetWidth
    );
  }, []);

  const { celebrities } = celebritiesSection;

  const shouldRenderMoreResultsButton = hasMoreResults && moreResultsPath;
  return (
    <section
      className={`celebrities-section-layout container pr-0 ${
        celebritiesSection.celebritySectionType === "MAIN_VIDEO_1"
          ? "celebrities-sections-videos"
          : ""
      }`}
    >
      <header className="celebrities-section__header d-flex align-items-center justify-content-between">
        <h2 className={`celebrities-section-layout__title`}>
          {celebritiesSection.title}
        </h2>
        {shouldRenderMoreResultsButton ? (
          <NavLink to={moreResultsPath} className="mb-1 font-weight-bold">
            Ver más
          </NavLink>
        ) : null}
      </header>
      {showLeftScrollButton ? (
        <button
          className="celebrities-section-layout__scroll-to-button d-none d-md-block"
          onClick={scrollTo("left")}
        >
          <i className="fa fa-chevron-left text-white" />
        </button>
      ) : null}
      <ul
        className="celebrities-section-layout__cards-list"
        ref={cardListRef}
        onScroll={setScrollButtonsVisibility}
      >
        {celebrities.length > 0
          ? celebrities.map((celebrity, index) => (
              <li
                key={`${celebritiesSection.id}-${celebrity.id}`}
                className="celebrities-section-layout__card-item"
              >
                {celebritiesSection.celebritySectionType !==
                "CELEBRITY_CARD" ? (
                  <VideoCardLayout
                    celebrity={celebrity}
                    videoKey={`${celebritiesSection.id}-${celebrity.id}`}
                  />
                ) : (
                  <CelebrityCardLayout celebrity={celebrity} />
                )}
              </li>
            ))
          : null}
      </ul>
      {showRightScrollButton ? (
        <button
          className="celebrities-section-layout__scroll-to-button scroll-to-right-button d-none d-md-block"
          onClick={scrollTo("right")}
        >
          <i className="fa fa-chevron-right text-white" />
        </button>
      ) : null}
    </section>
  );
};

CelebritiesCardsSectionLayout.defaultProps = {
  hasMoreResults: false,
  moreResultsPath: "#"
};

export { CelebritiesCardsSectionLayout };
