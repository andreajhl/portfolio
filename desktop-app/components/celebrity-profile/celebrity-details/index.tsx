import { LikeButton } from "desktop-app/components/common/button/like";
import OptimizedImage from "desktop-app/components/common/helpers/optimized-image";
import { celebrityType } from "desktop-app/types/celebrityType";
import Maybe from "../../common/helpers/maybe";
import { CollapsibleText } from "../../common/helpers/collapsible-text";
import styles from "./styles.module.scss";
import { Link } from "desktop-app/components/common/routing/link";
import { CelebrityResponseTime } from "desktop-app/components/celebrity-response-time";
import { CelebrityFlag } from "desktop-app/components/common/celebrity-flag";
import { getSearchHashtagPath } from "constants/paths";

type CelebrityDetailsProps = {
  celebrity: celebrityType;
};

function CelebrityDetails({ celebrity }: CelebrityDetailsProps) {
  return (
    <section className={styles.CelebrityDetails}>
      <header className={styles.CelebrityDetailsHeader}>
        <div className={styles.CelebrityDetailsTitle}>
          <h1>{celebrity.fullName}</h1>
          <i className="fa fa-share-alt cursor-pointer" />
          <LikeButton className={styles.CelebrityDetailsLike} />
        </div>
        <div className={styles.CelebrityDetailsInfo}>
          <span className={styles.CelebrityDetailsInfoItemWithSeparator}>
            <CelebrityFlag
              alpha2Code={celebrity.alpha2Code}
              width={23}
              className={styles.CelebrityDetailsFlag}
            />
            {celebrity.categoryTitle}
          </span>
          <span className={styles.CelebrityDetailsInfoItemWithSeparator}>
            <i className="fa fa-star text-warning mr-2"></i>
            4.5
          </span>
          <span className={styles.CelebrityDetailsInfoItem}>
            Respuesta promedio:{" "}
            <CelebrityResponseTime
              availableForFlashDeliveries={
                celebrity.availableForFlashDeliveries
              }
              turnAroundTime={celebrity.turnaround}
            />
          </span>
        </div>
      </header>
      <div className={styles.CelebrityDetailsAvatarContainer}>
        <OptimizedImage
          className={styles.CelebrityDetailsAvatar}
          placeholderSrc="/assets/img/avatar-blank.png"
          src={celebrity.avatar}
          width={220}
          height={220}
        />
        <section className={styles.WarrantyAd}>
          <img
            src="/assets/img/famosos-warranty-icon.png"
            alt="Logo de Garantía Famosos"
          />
          <h3>Garantía Famosos</h3>
          <p>
            Video grabado por
            <br />
            Andrés Cepeda
            <br />
            100% personalizado.
            <br />
          </p>
          <p>
            Si no recibes tu video en
            <br />
            7 días te reembolsamos
            <br /> el 100% de tu dinero.
            <span className={styles.WarrantyAdInfoIcon}>
              <i className="fas fa-info-circle" />
            </span>
          </p>
        </section>
      </div>
      <CollapsibleText className={styles.CelebrityDetailsDescription}>
        {celebrity.description}
      </CollapsibleText>
      <Maybe it={celebrity.isDonor}>
        <div className={styles.CelebrityDetailsDonorAlert}>
          <img src="/assets/img/donor-icon.png" alt="Corazón" />
          <p>
            {celebrity.fullName} dona de sus ingresos a: {celebrity.causeName}
          </p>
        </div>
      </Maybe>
      <div className={styles.CelebrityDetailsHashtags}>
        {celebrity?.hashtags?.map?.((hashtag) => (
          <Link key={hashtag} href={getSearchHashtagPath(hashtag)}>
            <span>#{hashtag}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export { CelebrityDetails };
