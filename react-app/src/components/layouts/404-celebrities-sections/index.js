import React, { useEffect } from "react";
import { connect } from "react-redux";
import getCookie from "../../../utils/getCookie";
import { fetchCelebritySections } from "../../../state/ducks/celebrity-sections/actions";
import { CelebritiesCardsSectionLayout } from "../celebrities-cards-section";
import { CelebritiesShimmerCardsSectionLayout } from "../celebrities-shimmer-cards-section";

const offsetInitialValue = 0;
const resultsLimit = 3;

const mapStateToProps = ({ celebritySections }) => {
  const { loading, data } = celebritySections.fetchCelebritySectionsReducer;
  return {
    loading: loading,
    celebritiesSections: data.results
  };
};

const mapDispatchToProps = { fetchCelebritySections };

const FourZeroFourCelebritiesSectionsLayout = ({
  fetchCelebritySections,
  loading,
  celebritiesSections
}) => {
  useEffect(() => {
    fetchCelebritySections({
      offset: offsetInitialValue,
      limit: resultsLimit,
      alpha2Code: getCookie("userLocation")
    });
  }, []);

  return (
    <section className="FourZeroFourCelebritiesSectionsLayout">
      {loading ? (
        <CelebritiesShimmerCardsSectionLayout />
      ) : celebritiesSections.length > 0 ? (
        celebritiesSections.map((celebritiesSection) => (
          <CelebritiesCardsSectionLayout
            key={celebritiesSection.id}
            celebritiesSection={celebritiesSection}
          />
        ))
      ) : null}
    </section>
  );
};

const _FourZeroFourCelebritiesSectionsLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(FourZeroFourCelebritiesSectionsLayout);

export { _FourZeroFourCelebritiesSectionsLayout as FourZeroFourCelebritiesSectionsLayout };
