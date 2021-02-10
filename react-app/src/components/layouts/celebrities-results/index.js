import React from "react";
import * as GTM from "../../../state/utils/gtm";
import { CelebritiesInfinityScrollLayout } from "../celebrities-infinity-scroll";

const CelebritiesResultsLayout = ({
  celebrities,
  totalResults,
  queryParams,
  fetchMoreData
}) => {
  const isSearchingByKeyword = Boolean(queryParams.search);

  const registerCelebritiesResultsGoUpButtonClick = () =>
    GTM.tagManagerDataLayer("CLICK_CELEBRITIES_RESULTS_GO_UP_BUTTON", {
      widget: "CelebritiesResultsLayout",
      path: window.location.pathname,
      totalResults,
      search: queryParams.search
    });

  return (
    <CelebritiesInfinityScrollLayout
      sectionTitleText={`Resultados ${
        isSearchingByKeyword ? `para ${queryParams.search}` : "de búsqueda"
      }`}
      onEndMessageButtonClick={registerCelebritiesResultsGoUpButtonClick}
      noResultsText={
        <>
          No se encontraron resultados <br /> para{" "}
          {isSearchingByKeyword ? `"${queryParams.search}"` : "esta búsqueda"}.
        </>
      }
      celebrities={celebrities}
      totalResults={totalResults}
      fetchMoreData={fetchMoreData}
      totalResultsToShowGoBackButton={10}
    />
  );
};

CelebritiesResultsLayout.defaultProps = {
  celebrities: [],
  queryParams: {}
};

export { CelebritiesResultsLayout };
