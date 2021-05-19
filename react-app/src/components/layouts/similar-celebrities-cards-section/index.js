import React, { useEffect } from "react";
import { connect } from "react-redux";
import { CelebrityCardLayout } from "../celebrity-card";
import { fetchSimilarCelebrities } from "../../../state/ducks/celebrities/actions";
import * as CarouselWithButtons from "../carousel-with-buttons";

import { CelebrityShimmerCardLayout } from "../celebrity-shimmer-card";
import * as GTM from "../../../state/utils/gtm";
import { FormattedMessage } from "react-intl";
import getWindow from "react-app/src/utils/getWindow";

const SimilarCelebritiesCardsSectionLayout = ({
  celebrityUsername,
  isLoading,
  similarCelebrities,
  fetchSimilarCelebrities,
}) => {
  useEffect(() => {
    if (!celebrityUsername) return;
    fetchSimilarCelebrities(celebrityUsername);
  }, [celebrityUsername, fetchSimilarCelebrities]);

  const analyticsData = {
    widget: "SimilarCelebritiesCardsSectionLayout",
    path: getWindow().location.pathname,
    celebrityUsername,
  };

  const registerListHover = () => {
    GTM.tagManagerDataLayer(
      "HOVER_SIMILAR_CELEBRITIES_CARD_LIST",
      analyticsData
    );
  };

  const registerListScroll = (hasReachedListEnd) => {
    GTM.tagManagerDataLayer("SCROLL_SIMILAR_CELEBRITIES_CARD_LIST", {
      ...analyticsData,
      hasReachedListEnd,
    });
  };

  const registerSimilarCelebritiesCardsScrollButtonClick = (direction) => {
    GTM.tagManagerDataLayer(
      "CLICK_SIMILAR_CELEBRITIES_CARD_SECTION_SCROLL_BUTTON",
      { ...analyticsData, direction }
    );
  };

  return (
    <section className="SimilarCelebritiesCardsSectionLayout mb-2 pt-2">
      <CarouselWithButtons.Container
        buttonsStyles={{ top: "2.85rem" }}
        onScrollTo={registerSimilarCelebritiesCardsScrollButtonClick}
        onListScroll={registerListScroll}
      >
        <CarouselWithButtons.Header>
          <CarouselWithButtons.Title className="text-black text-center mb-4 w-100 font-weight-bold">
            <FormattedMessage defaultMessage="Famosos similares" />
          </CarouselWithButtons.Title>
        </CarouselWithButtons.Header>
        <CarouselWithButtons.List>
          <ul
            className="SimilarCelebritiesCardsSectionLayout__list"
            onMouseOver={registerListHover}
          >
            {!isLoading && similarCelebrities.length > 0
              ? similarCelebrities.map((similarCelebrity) => {
                  const celebrity = {
                    ...similarCelebrity,
                    username: similarCelebrity.celebrityUsername,
                    avatar: similarCelebrity.celebrityAvatar,
                    title: similarCelebrity.categoryTitle,
                    id: similarCelebrity.celebrityId,
                    discountPercentage: similarCelebrity.discountPercentage,
                    fullName: similarCelebrity.celebrityFullName,
                  };

                  return (
                    <li
                      className="mr-3"
                      key={"similar-celebrities-" + celebrity.id}
                    >
                      <CelebrityCardLayout celebrity={celebrity} />
                    </li>
                  );
                })
              : Array(15)
                  .fill(null)
                  .map((item, index) => (
                    <li className="mr-3" key={index}>
                      <CelebrityShimmerCardLayout />
                    </li>
                  ))}
          </ul>
        </CarouselWithButtons.List>
      </CarouselWithButtons.Container>
    </section>
  );
};

// default props
SimilarCelebritiesCardsSectionLayout.defaultProps = {
  isLoading: false,
  similarCelebrities: [],
};

const mapStateToProps = ({ celebrities }) => {
  return {
    isLoading: celebrities.fetchSimilarCelebritiesReducer.loading,
    similarCelebrities: celebrities.fetchSimilarCelebritiesReducer.data.results,
  };
};

const mapDispatchToProps = {
  fetchSimilarCelebrities,
};

const _SimilarCelebritiesCardsSectionLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimilarCelebritiesCardsSectionLayout);

export { _SimilarCelebritiesCardsSectionLayout as SimilarCelebritiesCardsSectionLayout };
