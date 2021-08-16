import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { StickyCallToActionTopBar } from "desktop-app/components/celebrity-profile/sticky-call-to-action-top-bar";
import { celebrityType } from "desktop-app/types/celebrityType";
import scrollToTop from "lib/utils/scrollToTop";
import classes from "classnames";
import styles from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import useGlobalFetches from "lib/hooks/useGlobalFetches";
import waitFor from "react-app/src/utils/waitFor";
import { CelebrityProfileDesktopLayout } from "../../celebrity-profile/celebrity-profile-layout";

const createContractWizardPosition = { top: 110 };
const createContractWizardBottom = 600; // por ser definido correctamente.

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
};

function CelebrityProfilePage({
  celebrity,
  shouldFocusCreateContractWizard = false,
}: CelebrityProfilePageProps) {
  useGlobalFetches();
  const [
    createContractWizardIsFocused,
    setCreateContractWizardIsFocused,
  ] = useState(false);
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

  function onCreateContractIsReady() {
    if (!shouldFocusCreateContractWizard) return;
    goToCreateContractWizard();
  }

  const isJuanseQuintero = celebrity?.id === 6317;

  return (
    <PageContainer>
      <PageHeading showHomeLink />
      <StickyCallToActionTopBar
        appearancePosition={createContractWizardBottom}
        celebrity={celebrity}
        onCTAButtonClick={goToCreateContractWizard}
      />
      <CelebrityProfileDesktopLayout
        celebrity={celebrity}
        onCreateContractIsReady={onCreateContractIsReady}
        createContractContainerClassName={classes(
          styles.CreateContractWizard,
          createContractWizardIsFocused && styles.ContractWizardFocused
        )}
        showFanClubAdvertise={!isJuanseQuintero}
      />
    </PageContainer>
  );
}

export { CelebrityProfilePage };
