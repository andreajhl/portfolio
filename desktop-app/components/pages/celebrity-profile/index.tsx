import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { StickyCallToActionBar } from "desktop-app/components/celebrity-profile/sticky-call-to-action-bar";
import { celebrityType } from "desktop-app/types/celebrityType";
import scrollToTop from "lib/utils/scrollToTop";
import classes from "classnames";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import useGlobalFetches from "lib/hooks/useGlobalFetches";
import waitFor from "react-app/src/utils/waitFor";
import { useIsOnMobileScreen } from "lib/is-on-mobile-screen";
import Maybe from "desktop-app/components/common/helpers/maybe";
import dynamic from "next/dynamic";
import { calculateScrollOffset } from "../../../../lib/utils/calculateScrollOffset";
import { calculateElementEdge } from "../../../../lib/utils/calculateElementEdge";
import { analytics } from "react-app/src/state/utils/gtm";
import ContractInProgressType from "desktop-app/types/contractInProgressType";
import getWindow from "react-app/src/utils/getWindow";

const loading = () => <div className={styles.CelebrityProfileSkeleton} />;

const CelebrityProfileDesktopLayout = dynamic<any>(
  import("../../celebrity-profile/celebrity-profile-layout").then(
    (mod) => mod.CelebrityProfileDesktopLayout
  ),
  { loading }
);

const CelebrityProfileLayoutTwo = dynamic<any>(
  import(
    "react-app/src/components/celebrity-profile/celebrity-profile-layout-two"
  ).then((mod) => mod.CelebrityProfileLayoutTwo),
  { loading }
);

const CelebrityProfileLayoutFour = dynamic<any>(
  import(
    "react-app/src/components/celebrity-profile/celebrity-profile-layout-four"
  ).then((mod) => mod.CelebrityProfileLayoutFour),
  { loading }
);

const createContractWizardBottomInitialValue = 600;

function getWizardElement() {
  return waitFor(
    () => document.querySelector(`.${styles.CreateContractWizard}`) as any,
    1000,
    20
  );
}

async function focusWizardInput() {
  const firstInputSelector = `.${styles.CreateContractWizard} input`;
  const wizardFirstInputElement: HTMLElement = await waitFor(
    () => document.querySelector(firstInputSelector) as any
  );
  wizardFirstInputElement?.focus?.({ preventScroll: true });
}

function CelebrityProfileLayout({
  isMobile,
  layoutProps,
  celebrityProfileVersion,
}: {
  isMobile: boolean;
  layoutProps: { [key: string]: any };
  celebrityProfileVersion: string;
}) {
  if (!isMobile) return <CelebrityProfileDesktopLayout {...layoutProps} />;
  if (celebrityProfileVersion === "B") {
    return <CelebrityProfileLayoutTwo {...layoutProps} />;
  }

  return <CelebrityProfileLayoutFour {...layoutProps} />;
}

type CelebrityProfilePageProps = {
  celebrity: celebrityType;
  shouldFocusCreateContractWizard?: boolean;
  celebrityProfileVersion?: "B" | "D";
};

function CelebrityProfilePage({
  celebrity,
  shouldFocusCreateContractWizard = false,
  celebrityProfileVersion = "B",
}: CelebrityProfilePageProps) {
  useGlobalFetches();
  const isMobile = useIsOnMobileScreen();
  const [
    createContractWizardIsFocused,
    setCreateContractWizardIsFocused,
  ] = useState(false);
  const wizardChangeFocusTimeoutRef = useRef<number | NodeJS.Timeout>();
  const [createContractWizardBottom, setCreateContractWizardBottom] = useState(
    createContractWizardBottomInitialValue
  );

  async function goToCreateContractWizard() {
    const wizardElement = await getWizardElement();
    if (!wizardElement) return;
    scrollToTop({
      top: calculateScrollOffset(wizardElement, -32, "top"),
    });
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

  async function changeCreateContractWizardBottom() {
    const wizardElement = await getWizardElement();
    const wizardBottom = calculateElementEdge(wizardElement);
    if (!wizardBottom) return;
    setCreateContractWizardBottom(wizardBottom);
  }

  function trackProfileView(contractInProgress: ContractInProgressType) {
    analytics.trackCelebrityProfileView({
      celebrity,
      isMobile,
      shouldFocusCreateContractWizard,
      celebrityProfileVersion,
      contractInProgress,
      widget: "CelebrityProfilePage",
    });
  }

  function onCreateContractIsReady(contractInProgress: ContractInProgressType) {
    changeCreateContractWizardBottom();
    trackProfileView(contractInProgress);
    if (!shouldFocusCreateContractWizard) return;
    goToCreateContractWizard();
  }

  const isJuanseQuintero = celebrity?.id === 6317;

  const layoutProps = {
    celebrity: celebrity,
    onCreateContractIsReady,
    goToCreateContractWizard,
    createContractWizardClassName: classes(
      styles.CreateContractWizard,
      isMobile && styles.CreateContractWizardMobile,
      createContractWizardIsFocused && styles.ContractWizardFocused
    ),
    showFanClubAdvertise: !isJuanseQuintero,
  };

  const createContractWizardBottomWithOffset = createContractWizardBottom - 100;

  return (
    <PageContainer showSearch={false}>
      <Maybe it={!isMobile}>
        <PageHeading showHomeLink />
      </Maybe>
      <StickyCallToActionBar
        appearancePosition={
          isMobile
            ? {
                lessThan: createContractWizardBottom - getWindow()?.innerHeight,
                greaterThan: createContractWizardBottomWithOffset,
              }
            : createContractWizardBottomWithOffset
        }
        celebrity={celebrity}
        onCTAButtonClick={goToCreateContractWizard}
        isMobile={isMobile}
      />
      <CelebrityProfileLayout
        isMobile={isMobile}
        layoutProps={layoutProps}
        celebrityProfileVersion={celebrityProfileVersion}
      />
    </PageContainer>
  );
}
export { CelebrityProfilePage };
