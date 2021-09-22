import { useAuth } from "lib/famosos-auth";
import { ReactNode } from "react";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import styles from "./styles.module.scss";
import classes from "classnames";
import { Link } from "react-app/src/components/common/routing/link";
import Maybe from "react-app/src/components/common/helpers/maybe";
import { REFERRALS_HOME, ROOT_PATH } from "constants/paths";
import { useRouter } from "next/router";

const profilePictureStyles = { position: "relative", zIndex: 2 };

type ReferralsPageHeadingProps = {
  className?: string;
  title: ReactNode;
  avatarSize?: string | number;
  showBackToReferralsHomeButton?: boolean;
  showBackButton?: boolean;
};

function ReferralsPageHeading({
  title,
  avatarSize = 100,
  className,
  showBackButton = false,
  showBackToReferralsHomeButton = false,
}: ReferralsPageHeadingProps) {
  const { user } = useAuth();
  const router = useRouter();
  const userAvatar = user?.avatar || "/assets/img/avatar-blank.png";

  function goBack() {
    const canGoBack = window.history.length > 2;
    canGoBack ? router.back() : router.push(ROOT_PATH);
  }

  return (
    <header className={classes(styles.ReferralsPageHeading, className)}>
      <Maybe it={showBackButton}>
        <button
          type="button"
          className={classes("btn", styles.BackToButton, styles.GoBackButton)}
          onClick={goBack}
        >
          <i className="fa fa-chevron-left" />
        </button>
      </Maybe>
      <ProfilePicture
        avatar={userAvatar}
        width={avatarSize}
        height={String(avatarSize)}
        imageStyles={profilePictureStyles}
      />
      <h2 className={styles.ReferralsPageHeadingTitle}>{title}</h2>
      <Maybe it={showBackToReferralsHomeButton}>
        <Link
          href={REFERRALS_HOME}
          className={classes(
            "btn",
            styles.BackToButton,
            styles.BackToReferralsHome
          )}
        >
          <i className="fa fa-times" />
        </Link>
      </Maybe>
    </header>
  );
}

export { ReferralsPageHeading };
