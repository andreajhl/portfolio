import React, { useMemo } from "react";
import { CelebritiesSimilarResultsLayout } from "../celebrities-similar-results";
import getMoreFrequentIds from "../../../utils/getMoreFrequentIds";

const CelebritiesAdditionalResultsLayout = ({
  isCompleted,
  totalResults,
  isSearchingByKeyword,
  searchCelebrities,
  listParams
}) => {
  const similarResultsParams = useMemo(() => {
    if (searchCelebrities.length === 0 || !listParams.search) return listParams;

    return {
      ...listParams,
      country_id: getMoreFrequentIds(searchCelebrities, "countryId"),
      category_id: getMoreFrequentIds(searchCelebrities, "categoryId")
    };
  }, [searchCelebrities, listParams]);
  if (!isCompleted) return null;
  if (totalResults >= 6) return null;
  return (
    <CelebritiesSimilarResultsLayout
      similarResultsParams={similarResultsParams}
    />
  );
};

export { CelebritiesAdditionalResultsLayout };
