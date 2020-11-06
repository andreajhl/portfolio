import React from "react";
import { CelebrityCardLayout } from "../celebrity-card";
import { CelebrityShimmerCardLayout } from "../celebrity-shimmer-card";
import { VideoCardLayout } from "../video-card";
import { VideoShimmerCardLayout } from "../video-shimmer-card";
import "./styles.scss";

const CelebritiesShimmerCardsSectionLayout = () => {
  const shimmerCelebritiesCardsItems = Array(15)
    .fill(null, 0, 15)
    .map((item, index) => (
      <li key={index} className="celebrities-section-layout__card-item">
        <CelebrityShimmerCardLayout />
      </li>
    ));

  const shimmerVideosCardsItems = Array(15)
    .fill(null, 0, 15)
    .map((item, index) => (
      <li key={index} className="celebrities-section-layout__card-item">
        <VideoShimmerCardLayout />
      </li>
    ));

  return (
    <>
      <section className="celebrities-shimmer-section-layout container pr-0">
        <div className="celebrities-shimmer-section-layout__title"></div>
        <ul className="celebrities-shimmer-section-layout__cards-list">
          {shimmerCelebritiesCardsItems}
        </ul>
      </section>
      <section className="celebrities-shimmer-section-layout container pr-0">
        <div className="celebrities-shimmer-section-layout__title w-50"></div>
        <ul className="celebrities-shimmer-section-layout__cards-list">
          {shimmerCelebritiesCardsItems}
        </ul>
      </section>
      <section className="celebrities-shimmer-section-layout container pr-0">
        <div className="celebrities-shimmer-section-layout__title w-75"></div>
        <ul className="celebrities-shimmer-section-layout__cards-list">
          {shimmerVideosCardsItems}
        </ul>
      </section>
      <section className="celebrities-shimmer-section-layout container pr-0">
        <div className="celebrities-shimmer-section-layout__title w-50"></div>
        <ul className="celebrities-shimmer-section-layout__cards-list">
          {shimmerCelebritiesCardsItems}
        </ul>
      </section>
    </>
  );
};

export { CelebritiesShimmerCardsSectionLayout };
