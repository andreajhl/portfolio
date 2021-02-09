import CustomHead from "react-app/components/common/helpers/custom-head";
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
