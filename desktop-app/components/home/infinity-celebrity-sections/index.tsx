import CelebritiesSection from "desktop-app/components/layouts/celebrity-section-cards";
import { useEffect, useState } from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { connect } from "react-redux";
import { fetchCelebritySections } from "react-app/src/state/ducks/celebrity-sections/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { CelebritySectionType } from "desktop-app/types/celebritySectionType";
import { tagManagerDataLayer } from "react-app/src/state/utils/gtm";

const categories = Array(5).fill(
  {
    title: "Músicos",
    image: "/assets/img/musicos.png",
    url: "/"
  },
  0
);

const mapStateToProps = ({ celebritySections }) => {
  const { loading, data } = celebritySections.fetchCelebritySectionsReducer;
  return {
    loading,
    celebritiesSections: data.results,
    totalResults: data.totalResults
  };
};

const mapDispatchToProps = { fetchCelebritySections };

const offsetInitialValue = 0;
const resultsLimit = 4;

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type InfinityCelebritySectionsProps = {
  celebritiesSections: CelebritySectionType[];
} & Omit<StateProps, "celebritiesSections"> &
  DispatchProps;

function InfinityCelebritySections({
  celebritiesSections,
  totalResults,
  fetchCelebritySections
}: InfinityCelebritySectionsProps) {
  const [offset, setOffset] = useState(offsetInitialValue);

  useEffect(() => {
    if (offset === offsetInitialValue) return;
    fetchCelebritySections({
      offset,
      limit: resultsLimit
      /* landingId,
      alpha2Code: getCookie("userLocation") */
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
        hasReachedEnd: newOffset + resultsLimit >= totalResults
      });
      return newOffset;
    });
  };

  return (
    <InfiniteScroll
      dataLength={celebritiesSections.length}
      next={fetchMoreData}
      hasMore={celebritiesSections.length < totalResults}
      loader={null}
      style={{ overflow: "visible" }}
    >
      {celebritiesSections.map((celebritySection, index) => (
        <>
          <CelebritiesSection
            key={celebritySection.id}
            celebritySection={celebritySection}
          />
          <Maybe it={index === 3}>
            <CelebritiesSection
              key="celebritySection-categories"
              celebritySection={{
                celebritySectionType: "CATEGORY_CARD",
                position: 999,
                id: 0,
                title: "Categorías destacadas",
                celebrities: categories
              }}
            />
          </Maybe>
        </>
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
