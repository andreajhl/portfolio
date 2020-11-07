import React, { useEffect } from "react";
import { connect } from "react-redux";
import { CelebritiesCardsSectionLayout } from "../celebrities-cards-section";
import { CelebritiesShimmerCardsSectionLayout } from "../celebrities-shimmer-cards-section";
import { fetchCelebritySections } from "../../../state/ducks/celebrity-sections/actions";
import "./styles.scss";

const mapStateToProps = ({ celebritySections }) => {
  const { loading, data } = celebritySections.fetchCelebritySectionsReducer;
  return { loading, celebritiesSections: data.results };
};

const mapDispatchToProps = { fetchCelebritySections };

const CelebritiesSectionsLayout = ({
  loading,
  celebritiesSections,
  fetchCelebritySections
}) => {
  useEffect(() => {
    fetchCelebritySections({ offset: 0, limit: 10, orderBy: "position" });
  }, []);

  return (
    <div className="CelebritiesSectionsLayout">
      {loading ? <CelebritiesShimmerCardsSectionLayout /> : null}
      {celebritiesSections.length > 0
        ? celebritiesSections.map((celebritiesSection) => (
            <CelebritiesCardsSectionLayout
              key={celebritiesSection.id}
              title={celebritiesSection.title}
              type={celebritiesSection.celebritySectionType}
              celebrities={celebritiesSection.celebrities}
            />
          ))
        : null}
    </div>
  );
};

CelebritiesSectionsLayout.defaultProps = {};

// Export Class
const _CelebritiesSectionsLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebritiesSectionsLayout);

export { _CelebritiesSectionsLayout as CelebritiesSectionsLayout };
