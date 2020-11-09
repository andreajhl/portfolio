import React from "react";
import { CelebrityShimmerCardLayout } from "../celebrity-shimmer-card";
import "./styles.scss";

const CelebritiesResultsShimmerCardsLayout = (props) => {
  return (
    <div className="CelebritiesResultsLayout">
      <section className="celebrities-results-shimmer-layout container">
        <div className="celebrities-results-shimmer-layout__title"></div>
        <ul className="celebrities-results-shimmer-layout__cards-list">
          {Array(15)
            .fill(null, 0, 15)
            .map((item, index) => (
              <li
                key={index}
                className="celebrities-results-shimmer-layout__card-item"
              >
                <CelebrityShimmerCardLayout />
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
};

export { CelebritiesResultsShimmerCardsLayout };
