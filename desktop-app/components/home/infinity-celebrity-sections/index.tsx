import CelebritiesSection from "desktop-app/components/layouts/celebrity-section-cards";
import React from "react";

function InfinityCelebritySections({ celebritiesSections }) {
  return celebritiesSections.map((celebritySection, index) => (
    <CelebritiesSection
      key={celebritySection.id}
      celebritySection={celebritySection}
    />
  ));
}

export default InfinityCelebritySections;
