import CelebritiesSection from "desktop-app/components/layouts/celebrity-section-cards";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { CelebritySectionType } from "desktop-app/types/celebritySectionType";
import { tagManagerDataLayer } from "react-app/src/state/utils/gtm";
import { fetchLandings } from "react-app/src/state/ducks/landings/actions";
import getCookie from "lib/utils/getCookie";
import { USER_LOCATION_KEY } from "constants/keys";
import { InfinityCelebritySkeleton } from "./skeleton";

const mapStateToProps = ({ landings }) => {
  const { loading, data } = landings.fetchLandingsReducer;
  return {
    loading,
    celebritiesSections: data.results,
    totalResults: data.totalResults,
  };
};

const mapDispatchToProps = { fetchLandings };

const offsetInitialValue = 0;
const resultsLimit = 10;

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type InfinityCelebritySectionsProps = {
  celebritiesSections: CelebritySectionType[];
} & Omit<StateProps, "celebritiesSections"> &
  DispatchProps;

function InfinityCelebritySections({
  celebritiesSections,
  totalResults,
  fetchLandings,
  loading,
}: InfinityCelebritySectionsProps) {
  const [offset, setOffset] = useState(offsetInitialValue);

  useEffect(() => {
    if (offset === offsetInitialValue) return;

    fetchLandings({
      offset,
      limit: resultsLimit,
      // landingId,
      alpha2Code: getCookie(USER_LOCATION_KEY),
    });
  }, [offset]);

  const fetchMoreData = () => {
    setOffset((offset) => {
      const nextOffset = offset + resultsLimit;
      const newOffset = nextOffset < totalResults ? nextOffset : totalResults;
      tagManagerDataLayer("FETCH_MORE_CELEBRITY_SECTIONS", {
        widget: "InfinityCelebritySections",
        path: window.location.pathname,
        newOffset,
        totalResults,
        hasReachedEnd: newOffset + resultsLimit >= totalResults,
      });
      return newOffset;
    });
  };

  return (
    <InfiniteScroll
      dataLength={celebritiesSections.length}
      next={fetchMoreData}
      hasMore={celebritiesSections.length < totalResults}
      loader={<InfinityCelebritySkeleton />}
      style={{ overflow: "visible" }}
    >
      {celebritiesSections.map((celebritySection) => (
        <CelebritiesSection
          celebritySection={celebritySection}
          key={celebritySection.id}
        />
      ))}
    </InfiniteScroll>
  );
}

const _InfinityCelebritySections = connect(
  mapStateToProps,
  mapDispatchToProps
)(InfinityCelebritySections);

export default InfinityCelebritySections;

export { _InfinityCelebritySections as InfinityCelebritySections };
