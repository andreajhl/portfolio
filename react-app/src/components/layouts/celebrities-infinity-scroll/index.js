import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CelebrityCardLayout } from "../celebrity-card";
import { EndMessageLayout } from "../end-message";
import { LoaderLayout } from "../loader";
import PropTypes from "prop-types";
import "./styles.scss";

const CelebritiesInfinityScrollLayout = ({
  celebrities,
  totalResults,
  fetchMoreData,
  onEndMessageButtonClick,
  sectionTitleText,
  totalResultsToShowGoBackButton,
  noResultsText
}) => {
  const hasResults = celebrities.length > 0;

  return (
    <section
      className={`celebrities-results-layout container ${
        celebrities.length > totalResultsToShowGoBackButton ? "pb-4" : ""
      } ${hasResults ? "px-2" : ""}`}
    >
      {hasResults ? (
        <>
          <h2 className="celebrities-results-layout__title">
            {sectionTitleText}
          </h2>
          <InfiniteScroll
            dataLength={celebrities.length}
            next={fetchMoreData}
            hasMore={celebrities.length < totalResults}
            loader={<LoaderLayout />}
            endMessage={
              celebrities.length > totalResultsToShowGoBackButton ? (
                <EndMessageLayout onClick={onEndMessageButtonClick} />
              ) : null
            }
          >
            <ul className="celebrities-results-layout__cards-list">
              {celebrities.map((celebrity) => (
                <li
                  key={celebrity.id}
                  className="celebrities-results-layout__card-item"
                >
                  <CelebrityCardLayout celebrity={celebrity} />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        </>
      ) : (
        <div className="align-items-center d-flex flex-column no-results">
          <img src="/assets/img/search-glass.svg" alt="Lupa" />
          <span className="no-results__text mt-3">{noResultsText}</span>
        </div>
      )}
    </section>
  );
};

CelebritiesInfinityScrollLayout.defaultProps = {
  celebrities: [],
  totalResults: 0,
  fetchMoreData: () => {},
  onEndMessageButtonClick: () => {},
  sectionTitleText: "Resultados de Famosos",
  totalResultsToShowGoBackButton: 10,
  noResultsText: "Sin resultados"
};

CelebritiesInfinityScrollLayout.propTypes = {
  celebrities: PropTypes.array,
  totalResults: PropTypes.number,
  fetchMoreData: PropTypes.func,
  onEndMessageButtonClick: PropTypes.func,
  sectionTitleText: PropTypes.node,
  totalResultsToShowGoBackButton: PropTypes.number,
  noResultsText: PropTypes.node
};

export { CelebritiesInfinityScrollLayout };
