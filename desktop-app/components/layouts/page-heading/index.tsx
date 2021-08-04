import Maybe from "desktop-app/components/common/helpers/maybe";
import { LeftArrowIcon } from "desktop-app/components/common/icons";
import { HomeButton } from "desktop-app/components/common/button/home-button";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

type PageHeadingProps = {
  children?: ReactNode;
  showBackButton?: boolean;
  showHomeLink?: boolean;
  onBackButtonClick?: () => void;
};

function PageHeading({
  children,
  showBackButton = true,
  showHomeLink = false,
  onBackButtonClick,
}: PageHeadingProps) {
  const router = useRouter();

  function goBack() {
    onBackButtonClick?.();
    window.history.length > 2 ? router.back() : router.push("/");
  }

  return (
    <div className={styles.PageHeading}>
      <div className={"container " + styles.PageHeadingContainer}>
        <Maybe it={showBackButton}>
          <button
            type="button"
            className={"btn " + styles.PageHeadingBackButton}
            onClick={goBack}
          >
            <LeftArrowIcon className={styles.PageHeadingHomeButton} />
          </button>
        </Maybe>
        <Maybe it={showHomeLink}>
          <HomeButton />
        </Maybe>
        <Maybe it={typeof children === "string"} orElse={children}>
          <span className="font-weight-bold">{children}</span>
        </Maybe>
      </div>
    </div>
  );
}

export { PageHeading };
