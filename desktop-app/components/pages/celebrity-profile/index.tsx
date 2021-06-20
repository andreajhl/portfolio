import { CelebrityDetails } from "desktop-app/components/celebrity-profile/celebrity-details";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ContractSteps } from "desktop-app/components/celebrity-profile/contract-steps";
import { CelebrityPublicContractsReel } from "desktop-app/components/layouts/celebrity-public-contracts-reel";
import { LastReviewsSection } from "desktop-app/components/layouts/last-reviews-section";
import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { StickyCallToActionTopBar } from "desktop-app/components/celebrity-profile/sticky-call-to-action-top-bar";
import { celebrityType } from "desktop-app/types/celebrityType";
import { connect, ConnectedProps } from "react-redux";
import { SimilarCelebritiesCardsReel } from "desktop-app/components/celebrity-profile/similar-celebrities-cards-reel";
import { CelebritySimilarVideosReel } from "desktop-app/components/celebrity-profile/celebrity-similar-videos-reel";
import { FanClubAdvertise } from "desktop-app/components/celebrity-profile/fan-club-advertise";
import scrollToTop from "lib/utils/scrollToTop";
import classes from "classnames";
import styles from "./styles.module.scss";
import { getUserContractInProgress } from "react-app/src/state/ducks/contracts/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { RootState } from "react-app/src/state/store";
import { useEffect, useRef, useState } from "react";
import { CreateContractWizardSkeleton } from "desktop-app/components/celebrity-profile/create-contract-wizard/skeleton";
import { ComponentProps as CreateContractWizardProps } from "desktop-app/components/celebrity-profile/create-contract-wizard/types";
import dynamic from "next/dynamic";
import useGlobalFetches from "lib/hooks/useGlobalFetches";

const CreateContractWizard = dynamic<CreateContractWizardProps>(
  () =>
    import(
      "desktop-app/components/celebrity-profile/create-contract-wizard"
    ).then((mod) => mod.CreateContractWizard),
  { loading: CreateContractWizardSkeleton }
);

const createContractWizardBottom = 600; // por ser definido correctamente.

const mapStateToProps = ({ celebrities, contracts }: RootState) => ({
  publicContracts: celebrities.fetchPublicContractsReducer.data.results,
  contractInProgressRequest: contracts.getUserContractInProgressReducer,
  isLoadingPublicContracts: celebrities.fetchPublicContractsReducer.loading,
});

const mapDispatchToProps = { getUserContractInProgress };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropFromRedux = ConnectedProps<typeof connector>;

type CelebrityProfilePageProps = {
  celebrity: celebrityType;
} & PropFromRedux;

function CelebrityProfilePage({
  celebrity,
  isLoadingPublicContracts,
  publicContracts,
  getUserContractInProgress,
  contractInProgressRequest,
}: CelebrityProfilePageProps) {
  useGlobalFetches();
  const [
    createContractWizardIsFocused,
    setCreateContractWizardIsFocused,
  ] = useState(false);
  const { isAuthenticated, isLoading } = useAuth0();
  const timeoutRef = useRef<number | NodeJS.Timeout>();

  function onStickyCTAClick() {
    scrollToTop({ top: 110 });
    setCreateContractWizardIsFocused(true);
    timeoutRef.current = setTimeout(() => {
      setCreateContractWizardIsFocused(false);
    }, 2000);
    const wizardFirstInputElement: HTMLElement = document.querySelector(
      `.${styles.CreateContractWizard} input`
    );
    wizardFirstInputElement?.focus?.({ preventScroll: true });
  }

  useEffect(
    () => () => {
      if (typeof timeoutRef.current !== "number") return;
      clearTimeout(timeoutRef.current);
    },
    []
  );

  useEffect(() => {
    if (!isAuthenticated) return;
    getUserContractInProgress(celebrity.username);
  }, [isAuthenticated, celebrity.username]);

  const showContractStepsBeforeReviews =
    !isLoadingPublicContracts && publicContracts?.length < 3;

  const showContractStepsAfterReviews =
    !isLoadingPublicContracts && publicContracts?.length >= 3;

  const showCelebritiesCards = publicContracts?.length > 0;

  const isReadyToCreateContract =
    contractInProgressRequest.completed || (!isLoading && !isAuthenticated);

  return (
    <PageContainer>
      <PageHeading showHomeLink />
      <StickyCallToActionTopBar
        appearancePosition={createContractWizardBottom}
        celebrity={celebrity}
        onCTAButtonClick={onStickyCTAClick}
      />
      <div className={styles.TopSectionWrapper}>
        <div className={classes("container", styles.CelebrityDetailsContainer)}>
          <div className={styles.CelebrityDetailsWrapper}>
            <CelebrityDetails celebrity={celebrity} />
          </div>
          <div>
            <Maybe
              it={isReadyToCreateContract}
              orElse={<CreateContractWizardSkeleton />}
            >
              <CreateContractWizard
                className={classes(
                  styles.CreateContractWizard,
                  createContractWizardIsFocused && styles.ContractWizardFocused
                )}
                celebrity={celebrity}
                contractInProgress={contractInProgressRequest?.data}
              />
            </Maybe>
            <Maybe it={celebrity.availableForSubscriptions}>
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
        <Maybe it={celebrity.showSimilarCelebrities}>
          <div className={styles.SimilarContentWrapper}>
            <Maybe
              it={showCelebritiesCards}
              orElse={
                <CelebritySimilarVideosReel
                  celebrityUsername={celebrity.username}
                />
              }
            >
              <SimilarCelebritiesCardsReel
                celebrityUsername={celebrity.username}
              />
            </Maybe>
          </div>
        </Maybe>
      </div>
    </PageContainer>
  );
}

const _CelebrityProfilePage = connector(CelebrityProfilePage);

export { _CelebrityProfilePage as CelebrityProfilePage };
