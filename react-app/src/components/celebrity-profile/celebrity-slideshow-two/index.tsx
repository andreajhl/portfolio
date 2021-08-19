import { celebrityType } from "desktop-app/types/celebrityType";
import styles from "./styles.module.scss";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ContractOccasion } from "desktop-app/components/common/widgets/contract-occasion";
import { ComponentProps as CelebrityHeroSlideshowProps } from "../../layouts/celebrity-hero-slideshow/types";
import dynamic from "next/dynamic";

const renderOnlyOnBrowser = { ssr: false };

const CelebrityHeroSlideshow = dynamic<CelebrityHeroSlideshowProps>(
  () =>
    import("../../layouts/celebrity-hero-slideshow").then(
      (mod) => mod.CelebrityHeroSlideshow
    ),
  renderOnlyOnBrowser
);

const renderVideoOverlayHeader = ({ MuteToggler }, { occasion }) => (
  <header className={styles.VideoOverlayHeader}>
    <Maybe it={Boolean(occasion)}>
      <ContractOccasion occasion={occasion} className={styles.VideoOccasion} />
    </Maybe>
    <MuteToggler className={styles.MuteToggler} />
  </header>
);

const renderVideoOverlayFooter = (
  { FullscreenToggler, PlayToggler, LikeToggler, ShareButton },
  { reference }
) => (
  <footer className={styles.VideoOverlayFooter}>
    <div>
      <FullscreenToggler />
    </div>
    <div className={styles.ReactionButtons}>
      <Maybe it={Boolean(reference)}>
        <ShareButton />
        <LikeToggler />
      </Maybe>
      <PlayToggler />
    </div>
  </footer>
);

type CelebritySlideshowTwoProps = {
  className?: string;
  celebrity: celebrityType;
};

function CelebritySlideshowTwo({
  className,
  celebrity,
}: CelebritySlideshowTwoProps) {
  return (
    <CelebrityHeroSlideshow
      className={className}
      celebrityAvatar={celebrity.avatar}
      celebrityMainVideo={celebrity.mainVideo}
      videoOverlayHeader={renderVideoOverlayHeader}
      videoOverlayFooter={renderVideoOverlayFooter}
    />
  );
}

export { CelebritySlideshowTwo };
