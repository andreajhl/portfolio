import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import ReferralType from "react-app/src/types/referralType";
import styles from "./styles.module.scss";
import classes from "classnames";
import { StarWithNumber } from "react-app/src/components/common/icons/star-with-number";

const profileImageStyles = { objectFit: "cover" };

type ReferralsListItemProps = { className?: string; referral: ReferralType };

function ReferralsListItem({ referral, className }: ReferralsListItemProps) {
  const { avatar, fullName, isBuyCompleted } = referral;
  const starColor = isBuyCompleted ? "var(--primary)" : "var(--gray-2)";

  return (
    <div className={classes(styles.ReferralsListItem, className)}>
      <ProfilePicture
        avatar={avatar || "/assets/img/avatar-blank.png"}
        width={66}
        height="66"
        imageStyles={profileImageStyles}
      />
      <span className={styles.ReferralsListItemUserFullName}>{fullName}</span>
      <StarWithNumber
        count={5}
        color={starColor}
        className={styles.ReferralsListItemStar}
        size={44}
      />
    </div>
  );
}

export { ReferralsListItem };
