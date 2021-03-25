import { ROOT_PATH } from "constants/paths";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { HouseIcon, LeftArrowIcon } from "desktop-app/components/common/icons";
import { Link } from "desktop-app/components/common/routing/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

type PageHeadingProps = {
  children: ReactNode;
  showBackButton?: boolean;
  showHomeLink?: boolean;
};

function PageHeading({
  children,
  showBackButton = true,
  showHomeLink = false
}: PageHeadingProps) {
  const router = useRouter();
  return (
    <div className={styles.PageHeading}>
      <div className={"container " + styles.PageHeadingContainer}>
        <Maybe it={showBackButton}>
          <button
            type="button"
            className={"btn " + styles.PageHeadingBackButton}
            onClick={() => router.back()}
          >
            <LeftArrowIcon />
          </button>
        </Maybe>
        <Maybe it={showHomeLink}>
          <Link href={ROOT_PATH} className={styles.PageHeadingHomeButton}>
            <HouseIcon />
          </Link>
        </Maybe>
        <Maybe it={typeof children === "string"} orElse={children}>
          <span className="font-weight-bold">{children}</span>
        </Maybe>
      </div>
    </div>
  );
}

export { PageHeading };
