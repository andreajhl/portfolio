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
import { CelebritySlideshowOne } from "../celebrity-slideshow-one";
import { CelebrityDetails } from "../../layouts/celebrity-details";
import { FanClubAdvertise } from "desktop-app/components/celebrity-profile/fan-club-advertise";
import { NotAvailableBanner } from "desktop-app/components/celebrity-profile/not-available-banner";
import { celebrityIsAvailableForContract } from "lib/utils/celebrityUtils";

type CelebrityProfileLayoutOneProps = {
  celebrity: celebrityType;
  createContractWizardClassName?: string;
  onCreateContractIsReady?: () => void;
  showFanClubAdvertise?: boolean;
};

function CelebrityProfileLayoutOne({
  celebrity,
  createContractWizardClassName,
  onCreateContractIsReady,
  showFanClubAdvertise = true,
}: CelebrityProfileLayoutOneProps) {
  const isAvailableForContract = celebrityIsAvailableForContract(
    celebrity.status
  );

  return (
    <>
      <div className={classes("container", styles.Container)}>
        <CelebrityDetails celebrity={celebrity} variant="1" />
      </div>
      <CelebritySlideshowOne
        className={classes(
          styles.HeroSlideshow,
          !isAvailableForContract &&
            styles.HeroSlideshowWithoutCreateContractOnTop
        )}
        celebrity={celebrity}
      />
      <div className={classes("container", styles.Container)}>
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
            className={classes(
              styles.CreateContractWizardOne,
              createContractWizardClassName
            )}
            celebrity={celebrity}
            onReadyToCreateContract={onCreateContractIsReady}
          />
        </Maybe>
        <AdWarrantyVideoPurchase celebrityFullName={celebrity.fullName} />
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
          className={styles.LastReviewsSection}
          showMore={true}
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

export { CelebrityProfileLayoutOne };
