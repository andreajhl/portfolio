import React from "react";
import CustomHead from "react-app/components/common/helpers/custom-head";
import { FiltersSectionLayout } from "react-app/components/layouts/filters-section";
import { HeroSectionLayout } from "react-app/components/layouts/hero-section";

const Home = () => {
  return (
    <>
      <CustomHead />
      <HeroSectionLayout />
      <FiltersSectionLayout />
    </>
  );
};

export default Home;
