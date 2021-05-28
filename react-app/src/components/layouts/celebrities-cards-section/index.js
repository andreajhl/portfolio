import React, { useState, useRef, useEffect, useMemo, memo } from "react";
import debounce from "lodash.debounce";
import { FixedSizeList } from "react-window";
import { CelebrityCardLayout } from "../celebrity-card";
import { VideoCardLayout } from "../video-card";
import { NavLink } from "react-app/src/components/common/routing";
import { SEARCH_PATH } from "../../../routing/Paths";
import { jsonToQueryString } from "../../../state/utils/apiService";
import * as GTM from "../../../state/utils/gtm";
import getMoreFrequentIds from "../../../utils/getMoreFrequentIds";
import getWindow from "react-app/src/utils/getWindow";
import Maybe from "../../common/helpers/maybe";
import useGetViewportWidthOnResize from "react-app/src/utils/useGetViewportWidthOnResize";
import getContainerWidthFromWindowWidth from "react-app/src/utils/getContainerWidthFromWindowWidth";
import {
  largeBreakPoint,
  smallBreakpoint
} from "react-app/src/constants/bootstrapBreakpoint";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";

const celebrityCardWidth = 150;
const videoCardWidth = 258;
const additionalVerticalSpace = 10;
const celebrityCardSectionHeight = 219 + additionalVerticalSpace;
const videoCardSectionHeight = 360 + additionalVerticalSpace;
const cardGap = 12;

const getColumn = (isVideoCardSection, celebritiesSectionId) => ({
  data,
  index,
  style
}) => {
  const celebrity = data[index];
  const isLastItem = index >= data.length - 1;
  return (
    <div
      style={isLastItem ? { ...style, width: style.width - cardGap } : style}
    >
      <Maybe
        it={isVideoCardSection}
        orElse={<CelebrityCardLayout celebrity={celebrity} />}
      >
        <VideoCardLayout
          celebrityId={celebrity.id}
          celebrityAvatar={celebrity.avatar}
          celebrityUsername={celebrity.username}
          celebrityFullName={celebrity.fullName}
          videoOccasion={celebrity.occasion}
          videoUrl={celebrity.videoUrl}
          videoPosterUrl={celebrity.videoPosterUrl}
          videoKey={`${celebritiesSectionId}-${celebrity.id}`}
        />
      </Maybe>
    </div>
  );
};

const initialState = {
  showLeftScrollButton: false,
  showRightScrollButton: false,
  mobileSectionWidth: 524,
  desktopSectionWidth: 1125
};

const getSectionWidth = (windowWidth) => {
  const containerWidth = getContainerWidthFromWindowWidth(windowWidth);
  if (windowWidth >= largeBreakPoint) {
    return containerWidth - 15;
  } else if (windowWidth >= smallBreakpoint) {
    return containerWidth + 16;
  }
  return containerWidth - 15;
};

function CelebritiesCardsSectionLayout({
  celebritiesSection,
  moreResultsPath,
  isMobile,
  isFavoriteSection
}) {
  const { locale } = useRouter();
  const [showLeftScrollButton, setShowLeftScrollButton] = useState(
    initialState.showLeftScrollButton
  );
  const [showRightScrollButton, setShowRightScrollButton] = useState(
    initialState.showRightScrollButton
  );
  const cardListRef = useRef(null);
  const windowWidth = useGetViewportWidthOnResize();
  const [sectionWidth, setSectionWidth] = useState(
    initialState[isMobile ? "mobileSectionWidth" : "desktopSectionWidth"]
  );

  useEffect(() => {
    setSectionWidth(getSectionWidth(windowWidth));
  }, [windowWidth]);

  const analyticsData = {
    widget: "CelebritiesCardsSectionLayout",
    path: getWindow().location.pathname,
    title: celebritiesSection.title,
    id: celebritiesSection.id,
    celebritySectionType: celebritiesSection.celebritySectionType,
    position: celebritiesSection.position
  };

  const scrollTo = (direction) => () => {
    const cardListElement = cardListRef.current._outerRef;
    const { offsetWidth } = cardListElement;
    cardListElement.scrollBy({
      left: direction === "right" ? offsetWidth : offsetWidth * -1,
      behavior: "smooth"
    });
    GTM.tagManagerDataLayer("CLICK_CELEBRITY_SECTION_SCROLL_BUTTON", {
      ...analyticsData,
      direction
    });
  };

  const setScrollButtonsVisibility = debounce(() => {
    const { scrollLeft, offsetWidth, scrollWidth } =
      cardListRef.current?._outerRef || {};
    setShowLeftScrollButton(scrollLeft !== 0);
    setShowRightScrollButton(scrollLeft + offsetWidth !== scrollWidth);
    GTM.tagManagerDataLayer("SCROLL_CELEBRITY_SECTION_LIST", {
      ...analyticsData,
      hasReachedListEnd: scrollLeft + offsetWidth >= scrollWidth
    });
  }, 100);

  useEffect(() => {
    const cardListElement = cardListRef.current._outerRef;
    setShowRightScrollButton(
      cardListElement.scrollWidth > cardListElement.offsetWidth
    );
  }, []);

  const { celebrities } = celebritiesSection;

  const searchMoreResultsPath = useMemo(() => {
    if (!celebrities) return "#";
    return (
      SEARCH_PATH +
      jsonToQueryString({
        country_id: getMoreFrequentIds(celebrities, "countryId"),
        category_id: getMoreFrequentIds(celebrities, "categoryId"),
        limit: 20
      })
    );
  }, [celebrities]);

  const hasMoreResults =
    celebritiesSection.celebritySectionType === "CELEBRITY_CARD" &&
    celebritiesSection.celebrities.length >= 10;

  const shouldRenderMoreResultsButton = hasMoreResults && moreResultsPath;

  const registerCelebritySectionHover = () =>
    GTM.tagManagerDataLayer("HOVER_CELEBRITY_SECTION", analyticsData);

  const registerSeeMoreResultsClick = () =>
    GTM.tagManagerDataLayer("CLICK_CELEBRITY_SECTION_SEE_MORE_LINK", {
      ...analyticsData,
      searchMoreResultsPath
    });

  const { celebritySectionType } = celebritiesSection;
  const isVideoCardSection = celebritySectionType !== "CELEBRITY_CARD";

  const Column = useMemo(
    () => getColumn(isVideoCardSection, celebritiesSection.id),
    []
  );
  const getTitle = () => {
    if (typeof celebritiesSection.title === "string")
      return celebritiesSection.title;

    return (
      celebritiesSection.title[locale] || celebritiesSection.title["es"] || ""
    );
  };
  return (
    <section
      className={`celebrities-section-layout container overflow-hidden pr-0 ${
        celebritiesSection.celebritySectionType === "MAIN_VIDEO_1"
          ? "celebrities-sections-videos"
          : ""
      }`}
      onMouseEnter={registerCelebritySectionHover}
    >
      <header className="celebrities-section__header d-flex justify-content-between">
        <h2 className={`celebrities-section-layout__title`}>{getTitle()}</h2>
        <Maybe it={hasMoreResults}>
          <NavLink
            to={moreResultsPath || searchMoreResultsPath}
            className="mb-1 font-weight-bold mr-3 mr-sm-0 flex-shrink-0"
            onClick={registerSeeMoreResultsClick}
          >
            <FormattedMessage defaultMessage="Ver más" description="" />
          </NavLink>
        </Maybe>
      </header>
      <Maybe it={showLeftScrollButton}>
        <button
          className="celebrities-section-layout__scroll-to-button d-none d-md-block"
          onClick={scrollTo("left")}
        >
          <i className="fa fa-chevron-left text-white" />
        </button>
      </Maybe>
      <FixedSizeList
        height={
          isVideoCardSection
            ? videoCardSectionHeight
            : celebrityCardSectionHeight
        }
        ref={cardListRef}
        width={sectionWidth}
        layout="horizontal"
        itemCount={celebrities.length}
        itemData={celebrities}
        onScroll={setScrollButtonsVisibility}
        className="celebrities-section-layout__cards-list"
        itemSize={
          (isVideoCardSection ? videoCardWidth : celebrityCardWidth) + cardGap
        }
      >
        {Column}
      </FixedSizeList>
      <Maybe it={showRightScrollButton}>
        <button
          className="celebrities-section-layout__scroll-to-button scroll-to-right-button d-none d-md-block"
          onClick={scrollTo("right")}
        >
          <i className="fa fa-chevron-right text-white" />
        </button>
      </Maybe>
    </section>
  );
}

CelebritiesCardsSectionLayout.defaultProps = {
  hasMoreResults: false
};

export { CelebritiesCardsSectionLayout };
