import React from "react";
import { CelebrityCardLayout } from "../celebrity-card";
import "./styles.scss";

const CelebritiesResultsLayout = ({ celebrities, queryParams, ...props }) => {
  console.log(props);
  const isSearchingByKeyword = /* queryParams.search !== "" */ false;
  const hasResults = celebrities.length > 0;
  return (
    <div className="CelebritiesResultsLayout">
      <section
        className={`celebrities-results-layout container ${
          hasResults ? "pr-0" : ""
        }`}
      >
        {hasResults ? (
          <>
            <h2 className="celebrities-results-layout__title">
              Resultados{" "}
              {isSearchingByKeyword
                ? `para ${queryParams.search}`
                : "de búsqueda"}
            </h2>
            <ul className="celebrities-results-layout__cards-list">
              {celebrities.map((celebrity) => (
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
                      username: celebrity.username,
                      videoMessagePrice: celebrity.video_message_price
                    }}
                  />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="align-items-center d-flex flex-column no-results">
            <img src="/assets/img/search-glass.svg" alt="Lupa" />
            <span className="no-results__text mt-3">
              No se encontraron resultados <br /> para{" "}
              {isSearchingByKeyword
                ? `"${queryParams.search}"`
                : "esta búsqueda"}
              .
            </span>
          </div>
        )}
      </section>
    </div>
  );
};

CelebritiesResultsLayout.defaultProps = {
  celebrities: []
};

export { CelebritiesResultsLayout };
