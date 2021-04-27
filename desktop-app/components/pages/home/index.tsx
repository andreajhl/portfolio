import HeroSection from "desktop-app/components/home/hero-section";
import PageContainer from "desktop-app/components/layouts/page-container";
import SearchBarSection from "desktop-app/components/home/search-bar-section";
import { InfinityCelebritySections } from "desktop-app/components/home/infinity-celebrity-sections";

function HomePage({ userLocation }: { userLocation?: string }) {
  return (
    <PageContainer showFooter={true} showTopBar={true}>
      <HeroSection userLocation={userLocation} />
      <div className="container mt-4 mb-5">
        <div className="mb-4">
          <SearchBarSection />
        </div>
        <InfinityCelebritySections />
      </div>
    </PageContainer>
  );
}

export { HomePage };
