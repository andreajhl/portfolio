import React from "react";
import { connect } from "react-redux";
import { CelebritiesCardsSectionLayout } from "../celebrities-cards-section";
import "./styles.scss";

const CelebritiesSectionsLayout = (props) => {
  return (
    <div className="CelebritiesSectionsLayout">
      <CelebritiesCardsSectionLayout title="Actores" />
      <CelebritiesCardsSectionLayout title="Famosos destacados" />
      <CelebritiesCardsSectionLayout title="Videos destacados" type="video" />
    </div>
  );
};

CelebritiesSectionsLayout.defaultProps = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

// Export Class
const _CelebritiesSectionsLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebritiesSectionsLayout);

export { _CelebritiesSectionsLayout as CelebritiesSectionsLayout };
