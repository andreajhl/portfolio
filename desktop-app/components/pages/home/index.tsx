import HeroSection from "desktop-app/components/home/hero-section";
import PageContainer from "desktop-app/components/layouts/page-container";
import SearchBarSectionV2 from "desktop-app/components/home/new-version-search-bar-section";
import { InfinityCelebritySections } from "desktop-app/components/home/infinity-celebrity-sections";
import useGlobalFetches from "lib/hooks/useGlobalFetches";

function HomePage({ userLocation }: { userLocation?: string }) {
  useGlobalFetches();
  return (
    <PageContainer showFooter={true} showTopBar={true}>
      <HeroSection userLocation={userLocation} />
      <div >
        <SearchBarSectionV2 />
        <div className="container mt-4 mb-5">
        <InfinityCelebritySections />
        </div>
      </div>
    </PageContainer>
  );
}

export { HomePage };
