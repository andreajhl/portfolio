import React from "react";
import CustomHead from "react-app/components/common/helpers/custom-head";
import { CelebrityCardLayout } from "react-app/components/layouts/celebrity-card";
import { CelebritiesSectionsLayout } from "react-app/components/layouts/celebrities-sections";
import { FiltersSectionLayout } from "react-app/components/layouts/filters-section";
import { HeroSectionLayout } from "react-app/components/layouts/hero-section";

const Home = () => {
  return (
    <>
      <CustomHead />
      <HeroSectionLayout />
      <FiltersSectionLayout />
      <CelebritiesSectionsLayout landingId={null} />
    </>
  );
};

export default Home;
