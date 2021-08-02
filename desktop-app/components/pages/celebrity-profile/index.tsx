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
import {
  getUserContractInProgress,
  cleanUserContractInProgress,
} from "react-app/src/state/ducks/contracts/actions";
import { useAuth } from "lib/famosos-auth";
import { RootState } from "react-app/src/state/store";
import { useEffect, useMemo, useRef, useState } from "react";
import { CreateContractWizardSkeleton } from "desktop-app/components/celebrity-profile/create-contract-wizard/skeleton";
import { ComponentProps as CreateContractWizardProps } from "desktop-app/components/celebrity-profile/create-contract-wizard/types";
import dynamic from "next/dynamic";
import useGlobalFetches from "lib/hooks/useGlobalFetches";
import { CREATE_CONTRACT_WIZARD_TEST_ID } from "__test__/testids";
import { getLocalContractInProgress } from "lib/utils/localContractInProgress";

const CreateContractWizard = dynamic<CreateContractWizardProps>(
  () =>
    import(
      "desktop-app/components/celebrity-profile/create-contract-wizard"
    ).then((mod) => mod.CreateContractWizard),
  { loading: CreateContractWizardSkeleton }
);

const createContractWizardPosition = { top: 110 };
const createContractWizardBottom = 600; // por ser definido correctamente.

function focusWizardInput() {
  const wizardFirstInputElement: HTMLElement = document.querySelector(
    `.${styles.CreateContractWizard} input`
  );
  wizardFirstInputElement?.focus?.({ preventScroll: true });
}

const mapStateToProps = ({ celebrities, contracts }: RootState) => ({
  publicContracts: celebrities.fetchPublicContractsReducer.data.results,
  contractInProgressRequest: contracts.getUserContractInProgressReducer,
  isLoadingPublicContracts: celebrities.fetchPublicContractsReducer.loading,
});

const mapDispatchToProps = {
  getUserContractInProgress,
  cleanUserContractInProgress,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropFromRedux = ConnectedProps<typeof connector>;

type CelebrityProfilePageProps = {
  celebrity: celebrityType;
  shouldFocusCreateContractWizard?: boolean;
} & PropFromRedux;

function CelebrityProfilePage({
  celebrity,
  shouldFocusCreateContractWizard = false,
  isLoadingPublicContracts,
  publicContracts,
  getUserContractInProgress,
  cleanUserContractInProgress,
  contractInProgressRequest,
}: CelebrityProfilePageProps) {
  useGlobalFetches();
  const [
    createContractWizardIsFocused,
    setCreateContractWizardIsFocused,
  ] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const [isReadyToCreateContract, setIsReadyToCreateContract] = useState(false);
  const wizardChangeFocusTimeoutRef = useRef<number | NodeJS.Timeout>();

  function goToCreateContractWizard() {
    scrollToTop(createContractWizardPosition);
    setCreateContractWizardIsFocused(true);
    wizardChangeFocusTimeoutRef.current = setTimeout(() => {
      setCreateContractWizardIsFocused(false);
    }, 2000);
    focusWizardInput();
  }

  useEffect(
    () =>
      function clearWizardChangeFocusTimeout() {
        if (typeof wizardChangeFocusTimeoutRef.current !== "number") return;
        clearTimeout(wizardChangeFocusTimeoutRef.current);
      },
    []
  );

  const localContractInProgress = useMemo(
    () => getLocalContractInProgress(celebrity.id),
    [celebrity.id]
  );

  useEffect(() => {
    if (!isAuthenticated || localContractInProgress) return;
    getUserContractInProgress(celebrity.username);
  }, [
    celebrity.username,
    getUserContractInProgress,
    isAuthenticated,
    localContractInProgress,
  ]);

  const showContractStepsBeforeReviews =
    !isLoadingPublicContracts &&
    (publicContracts?.length < 3 || publicContracts === null);

  const showContractStepsAfterReviews =
    !isLoadingPublicContracts && publicContracts?.length >= 3;

  const showCelebritiesCards = publicContracts?.length > 0;

  useEffect(() => {
    if (
      localContractInProgress ||
      contractInProgressRequest.completed ||
      (!isLoading && !isAuthenticated)
    ) {
      setIsReadyToCreateContract(true);
    }
  }, [
    contractInProgressRequest.completed,
    isAuthenticated,
    isLoading,
    localContractInProgress,
  ]);

  useEffect(() => {
    if (!shouldFocusCreateContractWizard) return;
    if (!isReadyToCreateContract) return;
    goToCreateContractWizard();
  }, [shouldFocusCreateContractWizard, isReadyToCreateContract]);

  useEffect(
    () => () => {
      setIsReadyToCreateContract(false);
      cleanUserContractInProgress();
    },
    [cleanUserContractInProgress, celebrity.username]
  );

  const contractInProgress =
    localContractInProgress || contractInProgressRequest?.data;

  return (
    <PageContainer>
      <PageHeading showHomeLink />
      <StickyCallToActionTopBar
        appearancePosition={createContractWizardBottom}
        celebrity={celebrity}
        onCTAButtonClick={goToCreateContractWizard}
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
                data-testid={CREATE_CONTRACT_WIZARD_TEST_ID}
                className={classes(
                  styles.CreateContractWizard,
                  createContractWizardIsFocused && styles.ContractWizardFocused
                )}
                celebrity={celebrity}
                contractInProgress={contractInProgress}
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

export default CelebrityProfilePage;

export { _CelebrityProfilePage as CelebrityProfilePage };
