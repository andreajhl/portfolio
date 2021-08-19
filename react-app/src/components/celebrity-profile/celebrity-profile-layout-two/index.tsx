import { SimilarCelebrityContent } from "desktop-app/components/celebrity-profile/similar-celebrity-content";
import { CreateContractContainer } from "desktop-app/components/celebrity-profile/create-contract-container";
import { LastReviewsSection } from "desktop-app/components/layouts/last-reviews-section";
import { celebrityType } from "desktop-app/types/celebrityType";
import AdWarrantyVideoPurchase from "../../layouts/ad-warranty-video-purchase";
import styles from "./styles.module.scss";
import { AboutCelebritySection } from "react-app/src/components/celebrity-profile/about-celebrity-section";
import { CelebrityHashtags } from "desktop-app/components/celebrity-profile/celebrity-hashtags";
import classes from "classnames";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { DonorAlert } from "desktop-app/components/celebrity-profile/donor-alert";
import { CelebritySlideshowTwo } from "../celebrity-slideshow-two";
import { CelebrityDetails } from "../../layouts/celebrity-details";
import { FanClubAdvertise } from "desktop-app/components/celebrity-profile/fan-club-advertise";

type CelebrityProfileLayoutTwoProps = {
  celebrity: celebrityType;
  createContractWizardClassName?: string;
  onCreateContractIsReady?: () => void;
  showFanClubAdvertise?: boolean;
};

function CelebrityProfileLayoutTwo({
  celebrity,
  createContractWizardClassName,
  onCreateContractIsReady,
  showFanClubAdvertise = true,
}: CelebrityProfileLayoutTwoProps) {
  return (
    <>
      <div className={classes("container", styles.Container)}>
        <CelebrityDetails celebrity={celebrity} variant="2" />
        <CreateContractContainer
          className={createContractWizardClassName}
          celebrity={celebrity}
          onReadyToCreateContract={onCreateContractIsReady}
        />
        <AdWarrantyVideoPurchase celebrityFullName={celebrity.fullName} />
      </div>
      <CelebritySlideshowTwo
        className={styles.HeroSlideshow}
        celebrity={celebrity}
      />
      <div className={classes("container", styles.Container)}>
        <AboutCelebritySection
          className={styles.AboutCelebritySection}
          celebrityDescription={celebrity.description}
          celebrityFullName={celebrity.fullName}
        />
        <CelebrityHashtags
          className={styles.CelebrityHashtags}
          celebrity={celebrity}
        />
        <Maybe it={celebrity.isDonor}>
          <DonorAlert
            className={styles.DonorAlert}
            fullName={celebrity.fullName}
            causeName={celebrity.causeName}
          />
        </Maybe>
        <Maybe
          it={showFanClubAdvertise && celebrity?.availableForSubscriptions}
        >
          <FanClubAdvertise
            className={styles.FanClubAdvertise}
            celebrity={celebrity}
          />
        </Maybe>
        <div className={styles.LastReviewsSectionWrapper}>
          <LastReviewsSection showMore={true} />
        </div>
      </div>
      <SimilarCelebrityContent
        className={styles.SimilarCelebrityContentWrapper}
        celebrity={celebrity}
        sidesPadding="5vw"
      />
    </>
  );
}

export { CelebrityProfileLayoutTwo };
