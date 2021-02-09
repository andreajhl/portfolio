import CustomHead from "react-app/components/common/helpers/custom-head";
import { CelebritiesSectionsLayout } from "react-app/components/layouts/celebrities-sections";
import { FiltersSectionLayout } from "react-app/components/layouts/filters-section";
import { HeroSectionLayout } from "react-app/components/layouts/hero-section";
import { PageContainer } from "react-app/components/layouts/page-container";
import { useFetchUser } from "../lib/user";
const Home = () => {
  const { user, loading } = useFetchUser();
  return (
    <>
      <PageContainer user={user} loading={loading}>
        <CustomHead />
        <HeroSectionLayout />
        <FiltersSectionLayout />
        <CelebritiesSectionsLayout landingId={null} />
      </PageContainer>
    </>
  );
};

export default Home;
