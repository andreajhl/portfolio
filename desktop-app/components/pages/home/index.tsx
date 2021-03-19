import HeroSection from "desktop-app/components/home/hero-section";
import PageContainer from "desktop-app/components/layouts/page-container";
import SearchBarSection from "desktop-app/components/home/search-bar-section";
import { CategoryCard } from "desktop-app/components/common/cards/category";

function HomePage() {
  return (
    <PageContainer showFooter={true} showTopBar={true}>
      <HeroSection />
      <div className="container mt-4">
        <div className="mb-4">
          <SearchBarSection />
        </div>

        <div className="d-flex justify-content-around flex-wrap"></div>
        <CategoryCard
          category={{
            title: "Músicos",
            image: "/assets/img/musicos.png",
            url: "/"
          }}
        />
      </div>
    </PageContainer>
  );
}

export { HomePage };
