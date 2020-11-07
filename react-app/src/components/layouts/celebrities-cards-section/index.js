import React from "react";
import { CelebrityCardLayout } from "../celebrity-card";
import { VideoCardLayout } from "../video-card";
import "./styles.scss";

const CelebritiesCardsSectionLayout = ({ title, type, celebrities }) => {
  return (
    <section className="celebrities-section-layout container pr-0">
      <h2 className="celebrities-section-layout__title">{title}</h2>
      <ul className="celebrities-section-layout__cards-list">
        {celebrities.length > 0
          ? celebrities.map((celebrity, index) => (
              <li
                key={`${title}-${type}-${celebrity.id}${index}`}
                className="celebrities-section-layout__card-item"
              >
                {type === "MAIN_VIDEO_1" ? (
                  <VideoCardLayout celebrity={celebrity} />
                ) : (
                  <CelebrityCardLayout celebrity={celebrity} />
                )}
              </li>
            ))
          : null}
      </ul>
    </section>
  );
};

export { CelebritiesCardsSectionLayout };
