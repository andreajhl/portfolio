import { celebrityType } from "desktop-app/types/celebrityType";
import styles from "./styles.module.scss";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ComponentProps as CelebrityHeroSlideshowProps } from "../../layouts/celebrity-hero-slideshow/types";
import dynamic from "next/dynamic";
import { useCelebrityHasPublicContracts } from "../../../../../lib/hooks/useCelebrityHasPublicContracts";

const renderOnlyOnBrowser = { ssr: false };

const CelebrityHeroSlideshow = dynamic<CelebrityHeroSlideshowProps>(
  () =>
    import("../../layouts/celebrity-hero-slideshow").then(
      (mod) => mod.CelebrityHeroSlideshow
    ),
  renderOnlyOnBrowser
);

const renderVideoOverlayHeader = (
  { MuteToggler, ShareButton, LikeToggler },
  { reference }
) => (
  <header className={styles.VideoOverlayHeader}>
    <Maybe it={Boolean(reference)}>
      <div className={styles.ReactionButtons}>
        <LikeToggler />
        <ShareButton menuPosition="bottom left" />
      </div>
    </Maybe>
    <MuteToggler className={styles.MuteToggler} />
  </header>
);

const renderVideoOverlayFooter = ({ FullscreenToggler, PlayToggler }) => (
  <footer className={styles.VideoOverlayFooter}>
    <FullscreenToggler />
    <PlayToggler />
  </footer>
);

type CelebritySlideshowOneProps = {
  className?: string;
  celebrity: celebrityType;
};

function CelebritySlideshowOne({
  className,
  celebrity,
}: CelebritySlideshowOneProps) {
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
    />
  );
}

export { CelebritySlideshowOne };
