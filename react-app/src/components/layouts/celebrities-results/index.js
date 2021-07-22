import React from "react";
import { FormattedMessage } from "react-intl";
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
      sectionTitleText={
        isSearchingByKeyword ? (
          <FormattedMessage
            defaultMessage="Resultados para {search}"
            values={{
              search: <strong>{queryParams.search}</strong>
            }}
          />
        ) : (
          <FormattedMessage defaultMessage="Resultados de búsqueda" />
        )
      }
      onEndMessageButtonClick={registerCelebritiesResultsGoUpButtonClick}
      noResultsText={
        <>
          <FormattedMessage
            defaultMessage=" No se encontraron resultados <br></br> para {search}."
            values={{
              br: (chunks) => <br></br>,
              search: isSearchingByKeyword
                ? `"${queryParams.search}"`
                : "esta búsqueda"
            }}
          />
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
