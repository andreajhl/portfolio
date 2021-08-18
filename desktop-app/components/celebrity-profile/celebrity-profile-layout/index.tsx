import { CelebrityDetails } from "desktop-app/components/celebrity-profile/celebrity-details";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ContractSteps } from "desktop-app/components/celebrity-profile/contract-steps";
import { CelebrityPublicContractsReel } from "desktop-app/components/layouts/celebrity-public-contracts-reel";
import { LastReviewsSection } from "desktop-app/components/layouts/last-reviews-section";
import { FanClubAdvertise } from "desktop-app/components/celebrity-profile/fan-club-advertise";
import classes from "classnames";
import styles from "./styles.module.scss";
import { NotAvailableBanner } from "desktop-app/components/celebrity-profile/not-available-banner";
import { celebrityIsUnavailable } from "lib/utils/celebrityUtils";
import { CreateContractContainer } from "desktop-app/components/celebrity-profile/create-contract-container";
import { connect, ConnectedProps } from "react-redux";
import { celebrityType } from "desktop-app/types/celebrityType";
import { RootState } from "react-app/src/state/store";
import { SimilarCelebrityContent } from "../similar-celebrity-content";

const mapStateToProps = ({ celebrities }: RootState) => {
  const publicContracts = celebrities.fetchPublicContractsReducer.data.results;
  const isLoadingPublicContracts =
    celebrities.fetchPublicContractsReducer.loading;

  const showContractStepsBeforeReviews =
    !isLoadingPublicContracts &&
    (publicContracts?.length < 3 || publicContracts === null);

  const showContractStepsAfterReviews =
    !isLoadingPublicContracts && publicContracts?.length >= 3;

  return {
    showContractStepsBeforeReviews,
    showContractStepsAfterReviews,
  };
};

const connector = connect(mapStateToProps);

type PropFromRedux = ConnectedProps<typeof connector>;

type CelebrityProfileDesktopLayoutProps = {
  celebrity: celebrityType;
  onCreateContractIsReady?: () => void;
  createContractContainerClassName?: string;
  showFanClubAdvertise?: boolean;
} & PropFromRedux;

function CelebrityProfileDesktopLayout({
  celebrity,
  onCreateContractIsReady,
  createContractContainerClassName,
  showFanClubAdvertise,
  showContractStepsBeforeReviews,
  showContractStepsAfterReviews,
}: CelebrityProfileDesktopLayoutProps) {
  return (
    <>
      <div className={styles.TopSectionWrapper}>
        <div className={classes("container", styles.CelebrityDetailsContainer)}>
          <div className={styles.CelebrityDetailsWrapper}>
            <CelebrityDetails celebrity={celebrity} />
          </div>
          <div>
            <Maybe
              it={!celebrityIsUnavailable(celebrity.status)}
              orElse={
                <NotAvailableBanner
                  celebrityName={celebrity.fullName}
                  celebrityId={celebrity.id}
                  celebrityUsername={celebrity.username}
                />
              }
            >
              <CreateContractContainer
                className={createContractContainerClassName}
                celebrity={celebrity}
                onReadyToCreateContract={onCreateContractIsReady}
              />
            </Maybe>
            <Maybe
              it={showFanClubAdvertise && celebrity?.availableForSubscriptions}
            >
              <FanClubAdvertise celebrity={celebrity} />
            </Maybe>
          </div>
        </div>
      </div>
      <div className="container">
        <div className={styles.CelebrityPublicContractWrapper}>
          <CelebrityPublicContractsReel
            celebrityId={celebrity.id}
            username={celebrity.username}
            celebrityFullName={celebrity.fullName}
            celebrityAvatar={celebrity.avatar}
          />
          <Maybe it={showContractStepsBeforeReviews}>
            <div className={styles.ContractStepsBeforeReviewsWrapper}>
              <ContractSteps />
            </div>
          </Maybe>
        </div>
        <div className={styles.LastReviewsSectionWrapper}>
          <LastReviewsSection showMore={true} />
        </div>
        <div className={styles.ContractStepsAfterReviewsContainer}>
          <Maybe it={showContractStepsAfterReviews}>
            <div className={styles.ContractStepsAfterReviewsWrapper}>
              <ContractSteps />
            </div>
          </Maybe>
        </div>
        <SimilarCelebrityContent
          celebrity={celebrity}
          className={styles.SimilarContentWrapper}
        />
      </div>
    </>
  );
}

const _CelebrityProfileDesktopLayout = connector(CelebrityProfileDesktopLayout);

export { _CelebrityProfileDesktopLayout as CelebrityProfileDesktopLayout };
