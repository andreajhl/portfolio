import { celebrityType } from "desktop-app/types/celebrityType";
import styles from "./styles.module.scss";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ContractOccasion } from "desktop-app/components/common/widgets/contract-occasion";
import { ComponentProps as CelebrityHeroSlideshowProps } from "../../layouts/celebrity-hero-slideshow/types";
import dynamic from "next/dynamic";
import { useCelebrityHasPublicContracts } from "lib/hooks/useCelebrityHasPublicContracts";

const renderOnlyOnBrowser = { ssr: false };

const CelebrityHeroSlideshow = dynamic<CelebrityHeroSlideshowProps>(
  () =>
    import("../../layouts/celebrity-hero-slideshow").then(
      (mod) => mod.CelebrityHeroSlideshow
    ),
  renderOnlyOnBrowser
);

const renderVideoOverlayHeader = (_components: any, { occasion }) => (
  <header className={styles.VideoOverlayHeader}>
    <Maybe it={Boolean(occasion)}>
      <ContractOccasion occasion={occasion} className={styles.VideoOccasion} />
    </Maybe>
  </header>
);

const renderVideoOverlayFooter = (
  { FullscreenToggler, PlayToggler, LikeToggler, ShareButton, MuteToggler },
  { reference }
) => (
  <footer className={styles.VideoOverlayFooter}>
    <div className={styles.ReactionButtons}>
      <Maybe it={Boolean(reference)}>
        <LikeToggler />
        <ShareButton />
      </Maybe>
      <FullscreenToggler />
      <PlayToggler />
      <MuteToggler className={styles.MuteToggler} />
    </div>
  </footer>
);

type MainVideoWidgetSlideshowProps = {
  className?: string;
  celebrity: celebrityType;
  onFullscreenExit?: () => void;
};

function MainVideoWidgetSlideshow({
  className,
  celebrity,
  onFullscreenExit,
}: MainVideoWidgetSlideshowProps) {
  const hasMainVideo = Boolean(celebrity.mainVideo);
  const hasPublicContracts = useCelebrityHasPublicContracts();

  if (!hasMainVideo && !hasPublicContracts) return null;

  return (
    <CelebrityHeroSlideshow
      className={className}
      celebrityAvatar={celebrity.avatar}
      celebrityMainVideo={celebrity.mainVideo}
      videoOverlayHeader={renderVideoOverlayHeader}
      videoOverlayFooter={renderVideoOverlayFooter}
      playMainVideoInFullscreenOnMount
      onFullscreenExit={onFullscreenExit}
    />
  );
}

export { MainVideoWidgetSlideshow };
