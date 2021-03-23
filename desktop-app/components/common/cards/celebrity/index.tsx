import { getCelebrityProfilePath, getSearchPath } from "constants/paths";
import { celebrityType } from "desktop-app/types/celebrityType";
import { LikeButton } from "../../button/like";
import { FlashDeliveryBadgeLayout } from "../../flash-delivery-badge";
import Maybe from "../../helpers/maybe";
import OptimizedImage from "../../helpers/optimized-image";
import { PriceLayout } from "../../helpers/price-layout";
import { Link } from "../../routing/link";
import styles from "./styles.module.scss";

type CelebrityCardProps = {
  celebrity: celebrityType;
};

function CelebrityCard({ celebrity }: CelebrityCardProps) {
  return (
    <Link
      href={getCelebrityProfilePath(celebrity.username)}
      className={styles.CelebrityCard}
    >
      <div className={styles.CelebrityCardThumbnail}>
        <OptimizedImage
          placeholderSrc="/assets/img/avatar-blank.png"
          height={210}
          width={170}
          src={celebrity.avatar}
          className={styles.CelebrityCardAvatar}
        />
        <div className={styles.CelebrityCardThumbnailFooter}>
          <Link href={getSearchPath({ category_id: celebrity.categoryId })}>
            <span className={styles.CelebrityCardCategory}>
              {celebrity.title}
            </span>
          </Link>
          <LikeButton />
        </div>
        <div className={styles.CelebrityCardThumbnailHeader}>
          {/* <span className={styles.CelebrityCardDiscountPercentage}>-40%</span> */}
          <Maybe it={celebrity.availableForFlashDeliveries}>
            <FlashDeliveryBadgeLayout />
          </Maybe>
        </div>
      </div>
      <div className={styles.CelebrityCardInfo}>
        <h4 className={styles.CelebrityCardHeading}>
          <img
            src={`https://flagcdn.com/w20/${
              celebrity?.alpha2Code?.toLowerCase?.() || "co"
            }.webp`}
            alt={`Bandera ${celebrity.countryCode}`}
            className="mr-2"
            width={20}
          />
          <span className="text-with-ellipsis">{celebrity.fullName}</span>
        </h4>
        <p className={"text-with-ellipsis " + styles.CelebrityCardHashtags}>
          {celebrity.hashtags.map((hashtag) => (
            <Link href={hashtag}>#{hashtag} </Link>
          ))}
        </p>
        <p className={"text-with-ellipsis " + styles.CelebrityCardPrice}>
          <PriceLayout decimalScale={0} price={celebrity.videoMessagePrice} />
        </p>
      </div>
    </Link>
  );
}

export { CelebrityCard };
