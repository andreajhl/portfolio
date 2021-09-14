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
import { celebrityIsAvailableForContract } from "lib/utils/celebrityUtils";
import { NotAvailableBanner } from "desktop-app/components/celebrity-profile/not-available-banner";
import ContractInProgressType from "desktop-app/types/contractInProgressType";

type CelebrityProfileLayoutThreeProps = {
  celebrity: celebrityType;
  createContractWizardClassName?: string;
  onCreateContractIsReady?: (
    contractInProgress: ContractInProgressType
  ) => void;
  showFanClubAdvertise?: boolean;
};

function CelebrityProfileLayoutThree({
  celebrity,
  createContractWizardClassName,
  onCreateContractIsReady,
  showFanClubAdvertise = true,
}: CelebrityProfileLayoutThreeProps) {
  const isAvailableForContract = celebrityIsAvailableForContract(
    celebrity.status
  );

  return (
    <>
      <div className={classes("container", styles.Container)}>
        <CelebrityDetails celebrity={celebrity} variant="1" />
        <Maybe
          it={isAvailableForContract}
          orElse={
            <NotAvailableBanner
              className={createContractWizardClassName}
              celebrityName={celebrity.fullName}
              celebrityId={celebrity.id}
              celebrityUsername={celebrity.username}
            />
          }
        >
          <CreateContractContainer
            className={createContractWizardClassName}
            celebrity={celebrity}
            onReadyToCreateContract={onCreateContractIsReady}
          />
        </Maybe>
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
        <LastReviewsSection
          showMore={true}
          className={styles.LastReviewsSection}
        />
      </div>
      <SimilarCelebrityContent
        className={styles.SimilarCelebrityContentWrapper}
        celebrity={celebrity}
        sidesPadding="5vw"
      />
    </>
  );
}

export { CelebrityProfileLayoutThree };
