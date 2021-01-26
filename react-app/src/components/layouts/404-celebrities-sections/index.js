import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCelebritySections } from "../../../state/ducks/celebrity-sections/actions";
import { CelebritiesCardsSectionLayout } from "../celebrities-cards-section";
import { CelebritiesShimmerCardsSectionLayout } from "../celebrities-shimmer-cards-section";
import "./styles.scss";

const offsetInitialValue = 0;
const resultsLimit = 3;

const mapStateToProps = ({ celebritySections, userLocation }) => {
  const { data } = celebritySections.fetchCelebritySectionsReducer;
  return {
    loading:
      celebritySections.fetchCelebritySectionsReducer.loading ||
      userLocation.getCountryCodeReducer.loading,
    celebritiesSections: data.results,
    countryCode: userLocation.getCountryCodeReducer.data.country_code
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
      alpha2Code: window.userLocation.countryCode
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
