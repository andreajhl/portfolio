import { AnimatedPopup } from "../../common/widgets/animated-popup";
import styles from "./styles.module.scss";
import classes from "classnames";
import { useMemo, useState } from "react";
import Maybe from "../../common/helpers/maybe";
import { analytics } from "react-app/src/state/utils/gtm";
import { NewsletterPopupContentASkeleton } from "react-app/src/components/layouts/newsletter-popup-content-a/skeleton";
import { NewsletterPopupContentBSkeleton } from "react-app/src/components/layouts/newsletter-popup-content-b/skeleton";
import { NewsletterPopupCompletedSkeleton } from "../../layouts/newsletter-popup-completed/skeleton";
import { NEWSLETTER_POPUP_IS_CLOSED } from "react-app/src/constants/localStorageKeys";
import dynamic from "next/dynamic";

const NewsletterPopupCompleted = dynamic<{ closeModal: () => void }>(
  () =>
    import("../../layouts/newsletter-popup-completed").then(
      (mod) => mod.NewsletterPopupCompleted
    ),
  { loading: NewsletterPopupCompletedSkeleton }
);

type NewsletterPopupContentProps = {
  className?: string;
  onCompleted: () => void;
};

const NewsletterPopupContentA = dynamic<NewsletterPopupContentProps>(
  () =>
    import("react-app/src/components/layouts/newsletter-popup-content-a").then(
      (mod) => mod.NewsletterPopupContentA
    ),
  { loading: NewsletterPopupContentASkeleton }
);

const NewsletterPopupContentB = dynamic<NewsletterPopupContentProps>(
  () =>
    import("react-app/src/components/layouts/newsletter-popup-content-b").then(
      (mod) => mod.NewsletterPopupContentB
    ),
  { loading: NewsletterPopupContentBSkeleton }
);

function preventAnimatedPopupFocus(event) {
  event.preventDefault();
  if (event.relatedTarget) {
    // Revert focus back to previous blurring element
    event.relatedTarget.focus();
  } else {
    // No previous focus target, blur instead
    event.currentTarget.blur();
  }
}

const getInitialIsOpenState = () =>
  !window.localStorage.getItem(NEWSLETTER_POPUP_IS_CLOSED);

const changeNewsletterIsClosed = () =>
  window.localStorage.setItem(NEWSLETTER_POPUP_IS_CLOSED, "true");

const getPopupVersionDependingOnTime = () => (Date.now() % 2 === 0 ? "A" : "B");

function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(getInitialIsOpenState);
  const [isCompleted, setIsCompleted] = useState(false);
  const popupVersion = useMemo(getPopupVersionDependingOnTime, []);
  const popupIsVersionA = popupVersion === "A";

  function trackCloseModal() {
    const eventName = isCompleted
      ? "FINISH_SUBSCRIPTION_MODAL"
      : "CLOSE_SUBSCRIPTION_MODAL";
    const eventData = { popupVersion, wasClosedWithButton: !isOpen };
    analytics.track(eventName, eventData);
  }

  function doNotOpenModalAgain() {
    trackCloseModal();
    changeNewsletterIsClosed();
  }

  function closeModal() {
    setIsOpen(false);
  }

  function completeSubscription() {
    setIsCompleted(true);
  }

  const NewsletterPopupContent = popupIsVersionA
    ? NewsletterPopupContentA
    : NewsletterPopupContentB;

  return (
    <AnimatedPopup open={isOpen} modal onClose={doNotOpenModalAgain}>
      <div
        className={classes(
          styles.NewsletterPopup,
          !isCompleted && popupIsVersionA && styles.PopupA
        )}
      >
        <button
          type="button"
          className={classes("btn", styles.CloseButton)}
          onClick={closeModal}
          onFocus={preventAnimatedPopupFocus}
        >
          <i className="fa fa-times" />
        </button>
        <Maybe
          it={!isCompleted}
          orElse={<NewsletterPopupCompleted closeModal={closeModal} />}
        >
          <NewsletterPopupContent
            className={styles.NewsletterPopupContent}
            onCompleted={completeSubscription}
          />
        </Maybe>
      </div>
    </AnimatedPopup>
  );
}

export { NewsletterPopup };
