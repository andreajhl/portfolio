import MyHiringsContract from "desktop-app/types/myHiringsContract";
import classes from "classnames";
import styles from "./styles.module.scss";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import { WarrantyAd } from "desktop-app/components/common/widgets/warranty-ad";
import { Link } from "desktop-app/components/common/routing/link";
import { getCelebrityProfilePath } from "constants/paths";

type ShoppingCartCardProps = {
  contractData: MyHiringsContract;
  className?: string;
};

function ShoppingCartCard({
  contractData,
  className = "",
}: ShoppingCartCardProps) {
  return (
    <section className={classes(styles.ShoppingCartCard, className)}>
      <div className={styles.LeftSide}>
        <Link
          className={styles.ProfilePictureLink}
          href={getCelebrityProfilePath(contractData.celebrityData.username)}
        >
          <ProfilePicture
            width={202}
            avatar={contractData.celebrityData.avatar}
          />
        </Link>
        <WarrantyAd
          celebrityFullName={contractData.celebrityData.fullName}
          className={styles.WarrantyAd}
        />
      </div>
      <div className={styles.RightSide}></div>
    </section>
  );
}

export { ShoppingCartCard };
