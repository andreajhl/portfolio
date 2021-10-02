import { REFERRALS_HOME } from "constants/paths";
import { useAuth } from "lib/famosos-auth";
import { StarWithNumber } from "react-app/src/components/common/icons/star-with-number";
import { Link } from "react-app/src/components/common/routing/link";
import styles from "./styles.module.scss";
import classes from "classnames";

type UserStarsLinkProps = {
  className?: string;
};

function UserStarsLink({ className }: UserStarsLinkProps) {
  const { user } = useAuth();
  const starsCount = user?.stars || 0;

  return (
    <Link
      href={REFERRALS_HOME}
      className={classes(styles.UserStarsLink, className)}
    >
      <StarWithNumber size={26} count={starsCount} color="black" />
    </Link>
  );
}

export { UserStarsLink };
