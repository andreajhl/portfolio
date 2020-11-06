import React from "react";
import { CelebrityCardLayout } from "../celebrity-card";
import { CelebrityShimmerCardLayout } from "../celebrity-shimmer-card";
import { VideoCardLayout } from "../video-card";
import { VideoShimmerCardLayout } from "../video-shimmer-card";
import "./styles.scss";

const CelebritiesCardsSectionLayout = ({ title, type }) => {
  return (
    <section className="celebrities-section-layout container pr-0">
      <h2 className="celebrities-section-layout__title">{title}</h2>
      <ul className="celebrities-section-layout__cards-list">
        {Array(7).fill(
          type !== "video" ? (
            <>
              <li className="celebrities-section-layout__card-item">
                <CelebrityShimmerCardLayout />
              </li>
              <li className="celebrities-section-layout__card-item">
                <CelebrityCardLayout celebrity={{ fullName: "German" }} />
              </li>
            </>
          ) : (
            <>
              <li className="celebrities-section-layout__card-item">
                <VideoCardLayout />
              </li>
              <li className="celebrities-section-layout__card-item">
                <VideoShimmerCardLayout />
              </li>
            </>
          ),
          0,
          7
        )}
      </ul>
    </section>
  );
};

export { CelebritiesCardsSectionLayout };
