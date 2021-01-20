import React, { useMemo } from "react";
import { updateQueryParamsInitialState } from "../../../state/ducks/celebrities/reducers";
import { CelebritiesSimilarResultsLayout } from "../celebrities-similar-results";
import getMoreFrequentIds from "../../../utils/getMoreFrequentIds";

const CelebritiesAdditionalResultsLayout = ({
  isCompleted,
  totalResults,
  isSearchingByKeyword,
  searchCelebrities
}) => {
  const isTopCelebritiesResults =
    searchCelebrities.length === 0 || !isSearchingByKeyword;
  const similarResultsParams = useMemo(() => {
    if (isTopCelebritiesResults) {
      return {
        top_celebrity: true,
        limit: updateQueryParamsInitialState.limit
      };
    }
    return {
      country_id: getMoreFrequentIds(searchCelebrities, "countryId"),
      category_id: getMoreFrequentIds(searchCelebrities, "categoryId"),
      limit: updateQueryParamsInitialState.limit
    };
  }, [searchCelebrities, isTopCelebritiesResults]);
  if (!isCompleted) return null;
  if (totalResults >= 6) return null;
  return (
    <CelebritiesSimilarResultsLayout
      similarResultsParams={similarResultsParams}
      isTopCelebritiesResults={isTopCelebritiesResults}
    />
  );
};

export { CelebritiesAdditionalResultsLayout };
