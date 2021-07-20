import MyHiringsContract from "desktop-app/types/myHiringsContract";
import classes from "classnames";
import styles from "./styles.module.scss";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import { WarrantyAd } from "desktop-app/components/common/widgets/warranty-ad";
import { Link } from "desktop-app/components/common/routing/link";
import { getCelebrityProfilePath } from "constants/paths";
import { IconButton } from "desktop-app/components/common/button/icon-button";
import { ContractOccasion } from "desktop-app/components/common/widgets/contract-occasion";
import getFormattedDate from "lib/utils/getFormattedDate";
import { FormattedMessage } from "react-intl";

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
      <div className={styles.RightSide}>
        <header className={styles.RightSideHeader}>
          <h2 className={styles.Title}>
            <FormattedMessage
              defaultMessage="Video personalizado de {celebrityFullName}"
              values={{
                celebrityFullName: contractData.celebrityData.fullName,
              }}
            />
          </h2>
          <IconButton>
            <i className={`far fa-trash-alt ${styles.TrashIcon}`} />
          </IconButton>
        </header>
        <div className={styles.OccasionWrapper}>
          <ContractOccasion occasion={contractData.occasion} />
          <span className={styles.CreationDate}>
            <FormattedMessage defaultMessage="Fecha de inicio de la solicitud:" />{" "}
            {getFormattedDate(new Date())}
          </span>
        </div>
        <div className={styles.PriceWrapper}>
          <span>
            <FormattedMessage defaultMessage="Total" />
          </span>
          <span>$125 USD</span>
        </div>
        <footer className={styles.RightSideFooter}>
          <img
            className={styles.SecurePayImg}
            src="/assets/img/shopping-card-pago-seguro.png"
            alt="Banner de pago seguro"
          />
          <Link href={"#"}>
            <button
              type="button"
              className={`btn btn-primary ${styles.FinishBuyButton}`}
            >
              <FormattedMessage defaultMessage="Finalizar compra" />
            </button>
          </Link>
        </footer>
      </div>
    </section>
  );
}

export { ShoppingCartCard };
