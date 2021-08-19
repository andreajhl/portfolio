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

const CelebrityProfileLayoutOne = dynamic<any>(
  import(
    "react-app/src/components/celebrity-profile/celebrity-profile-layout-one"
  ).then((mod) => mod.CelebrityProfileLayoutOne),
  { loading }
);

const createContractWizardBottomInitialValue = 600;

async function focusWizardInput() {
  const firstInputSelector = `.${styles.CreateContractWizard} input`;
  const wizardFirstInputElement: HTMLElement = await waitFor(
    () => document.querySelector(firstInputSelector) as any
  );
  wizardFirstInputElement?.focus?.({ preventScroll: true });
}

type CelebrityProfilePageProps = {
  celebrity: celebrityType;
  shouldFocusCreateContractWizard?: boolean;
  celebrityProfileVersion?: "A" | "B";
};

function CelebrityProfilePage({
  celebrity,
  shouldFocusCreateContractWizard = false,
  celebrityProfileVersion = "A",
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

  function goToCreateContractWizard() {
    scrollToTop({
      top: calculateScrollOffset(`.${styles.CreateContractWizard}`, 32, "top"),
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
    const wizardElement = await waitFor(
      () => document.querySelector(`.${styles.CreateContractWizard}`) as any,
      1000,
      20
    );
    const wizardBottom = calculateElementEdge(wizardElement);
    if (!wizardBottom) return;
    setCreateContractWizardBottom(wizardBottom - 100);
  }

  function onCreateContractIsReady() {
    changeCreateContractWizardBottom();
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

  return (
    <PageContainer showSearch={false}>
      <Maybe it={!isMobile}>
        <PageHeading showHomeLink />
      </Maybe>
      <StickyCallToActionBar
        appearancePosition={createContractWizardBottom}
        celebrity={celebrity}
        onCTAButtonClick={goToCreateContractWizard}
        isMobile={isMobile}
      />
      <Maybe
        it={isMobile}
        orElse={<CelebrityProfileDesktopLayout {...layoutProps} />}
      >
        <Maybe
          it={celebrityProfileVersion === "A"}
          orElse={<CelebrityProfileLayoutTwo {...layoutProps} />}
        >
          <CelebrityProfileLayoutOne {...layoutProps} />
        </Maybe>
      </Maybe>
    </PageContainer>
  );
}

export { CelebrityProfilePage };
