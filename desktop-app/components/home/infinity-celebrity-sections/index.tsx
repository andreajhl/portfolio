import CelebritiesSection from "desktop-app/components/layouts/celebrity-section-cards";
import React from "react";
import Maybe from "react-app/src/components/common/helpers/maybe";

const categories = Array(5).fill(
  {
    title: "Músicos",
    image: "/assets/img/musicos.png",
    url: "/"
  },
  0
);

function InfinityCelebritySections({ celebritiesSections }) {
  return celebritiesSections.map((celebritySection, index) => {
    return (
      <>
        <CelebritiesSection
          key={celebritySection.id}
          celebritySection={celebritySection}
        />
        <Maybe it={index === 3}>
          <CelebritiesSection
            key="celebritySection-categories"
            celebritySection={{
              celebritySectionType: "CATEGORY_CARD",
              position: 999,
              id: 0,
              title: "Categorías destacadas",
              celebrities: categories
            }}
          />
        </Maybe>
      </>
    );
  });
}

export default InfinityCelebritySections;
