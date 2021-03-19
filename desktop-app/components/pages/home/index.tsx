import { CelebrityCard } from "desktop-app/components/common/cards/celebrity";
import HeroSection from "desktop-app/components/home/hero-section";
import PageContainer from "desktop-app/components/layouts/page-container";
import SearchBarSection from "desktop-app/components/home/search-bar-section";
import { Button } from "react-bootstrap";
import styles from "./styles.module.scss";
import { CategoryCard } from "desktop-app/components/common/cards/category";
import Reel from "desktop-app/components/layouts/reel";
import ContractVideo from "desktop-app/components/layouts/contract-video";
import { CardsReelSection } from "desktop-app/components/layouts/cards-section-reel";
import { sections } from "constants/celebrities-sections";
import CelebritiesSection from "desktop-app/components/layouts/celebrity-section-cards";

function HomePage() {
  return (
    <PageContainer showFooter={true} showTopBar={true}>
      <HeroSection />
      <div className="container mt-4">
        <div className="mb-4">
          <SearchBarSection />
        </div>
        <CelebritiesSection celebritySection={sections[0]} />
        {/* 
        <Reel height={288} itemSize={186} itemCount={15}>
          {({ style }) => (
            <div style={style}>
              <CelebrityCard />
            </div>
          )}
        </Reel>
        <CelebrityCard />
        <Reel height={400} itemSize={290} itemCount={15}>
          {({ style }) => (
            <div style={style}>
              <ContractVideo />
            </div>
          )}
        </Reel>
        <div className="d-flex justify-content-around flex-wrap"></div>
        <CategoryCard
          category={{
            title: "Músicos",
            image: "/assets/img/musicos.png",
            url: "/"
          }}
        /> */}
      </div>
    </PageContainer>
  );
}

export { HomePage };
