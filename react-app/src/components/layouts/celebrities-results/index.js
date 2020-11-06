import React, { useEffect } from "react";
import { connect } from "react-redux";
import { CelebrityCardLayout } from "../celebrity-card";
import { fetchCelebritySections } from "../../../state/ducks/celebrity-sections/actions";
import "./styles.scss";

const mapStateToProps = ({ celebritySections }) => {
  const { loading, data } = celebritySections.fetchCelebritySectionsReducer;
  return { loading, celebritiesSections: data.results };
};

const mapDispatchToProps = { fetchCelebritySections };

const CelebritiesResultsLayout = ({
  celebrities,
  loading,
  celebritiesSections,
  fetchCelebritySections
}) => {
  return (
    <div className="CelebritiesResultsLayout">
      <section className="celebrities-results-layout container pr-0">
        <h2 className="celebrities-results-layout__title">
          Resultados para XXX
        </h2>
        <ul className="celebrities-results-layout__cards-list">
          {celebrities.length > 0
            ? celebrities.map((celebrity) => (
                <li
                  key={celebrity.id}
                  className="celebrities-results-layout__card-item"
                >
                  <CelebrityCardLayout
                    celebrity={{
                      fullName: celebrity.full_name,
                      avatar: celebrity.avatar,
                      countryCode: celebrity.country_code,
                      countryName: celebrity.country_name,
                      title: celebrity.title,
                      username: celebrity.username
                    }}
                  />
                </li>
              ))
            : null}
        </ul>
      </section>
    </div>
  );
};

CelebritiesResultsLayout.defaultProps = {};

// Export Class
const _CelebritiesResultsLayout = connect(
  mapStateToProps,
  mapDispatchToProps
)(CelebritiesResultsLayout);

export { _CelebritiesResultsLayout as CelebritiesResultsLayout };
