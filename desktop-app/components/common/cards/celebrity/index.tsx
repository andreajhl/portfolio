import {
  getCelebrityProfilePath,
  getSearchCategoryPath,
  getSearchHashtagPath,
} from "constants/paths";
import { CountryFlag } from "desktop-app/components/common/country-flag";
import { TextWithOverflow, parentElementClass } from "../../text-with-overflow";
import { celebrityType } from "desktop-app/types/celebrityType";
import { LikeButton } from "../../button/like";
import { FlashDeliveryBadgeLayout } from "../../flash-delivery-badge";
import Maybe from "../../helpers/maybe";
import OptimizedImage from "../../helpers/optimized-image";
import { PriceLayout } from "../../helpers/price-layout";
import { Link } from "../../routing/link";
import styles from "./styles.module.scss";
import useCelebrityFavorite from "lib/hooks/useCelebrityFavorite";
import classes from "classnames";
import getCelebrityDiscountPercentage from "lib/utils/getCelebrityDiscountPercentage";

const preventRedirectFromParent = (event) => {
  if (event.stopPropagation) {
    event.stopPropagation();
    event.preventDefault();
  }
};

function getCelebrityHashtags(celebrity: celebrityType) {
  return (
    celebrity?.hashtags
      ?.filter?.((hashtag, index, { length }) => {
        if (index !== 0 || length === 1) return true;
        const hashtagRegExp = new RegExp(hashtag, "gi");
        return !hashtagRegExp.test(celebrity.title);
      })
      ?.map((hashtag) => hashtag.replace("#", ""))
      ?.reduce((newHashtags, hashtag) => {
        if (newHashtags.length === 0) return [hashtag];
        const newHashtagStringLength = `#${newHashtags.join(" #")} #${hashtag}`
          .length;
        const MAX_LENGTH_ALLOWED = 20;
        if (newHashtagStringLength <= MAX_LENGTH_ALLOWED) {
          return [...newHashtags, hashtag];
        }
        return newHashtags;
      }, []) || []
  );
}

type CelebrityCardProps = {
  celebrity: celebrityType;
  thumbnailWidth?: number | string;
  thumbnailHeight?: number | string;
  showPrice?: boolean;
};

function CelebrityCard({
  celebrity,
  thumbnailWidth = 170,
  thumbnailHeight = 210,
  showPrice = true,
}: CelebrityCardProps) {
  const { isFavorite, toggleFavorite } = useCelebrityFavorite(celebrity.id);
  const { videoMessagePrice } = celebrity;
  const discountPercentage = getCelebrityDiscountPercentage(celebrity);
  const hasDiscount = discountPercentage > 0;
  const discountPrice =
    videoMessagePrice - videoMessagePrice * discountPercentage;

  return (
    <Link
      href={getCelebrityProfilePath(celebrity.username)}
      className={`${styles.CelebrityCard} ${parentElementClass}`}
      style={{ width: thumbnailWidth }}
    >
      <div className={styles.CelebrityCardThumbnail}>
        <OptimizedImage
          placeholderSrc="/assets/img/avatar-blank.png"
          height={thumbnailHeight}
          width={thumbnailWidth}
          src={celebrity.avatar}
          className={styles.CelebrityCardAvatar}
        />
        <div className={styles.CelebrityCardThumbnailFooter}>
          <Link href={getSearchCategoryPath(celebrity.categoryId)}>
            <span className={styles.CelebrityCardCategory}>
              {celebrity.title}
            </span>
          </Link>
          <LikeButton
            isFavorite={isFavorite}
            onClick={(event) => {
              preventRedirectFromParent(event);
              toggleFavorite();
            }}
          />
        </div>
        <div className={styles.CelebrityCardThumbnailHeader}>
          <Maybe it={hasDiscount}>
            <span className={styles.CelebrityCardDiscountPercentage}>
              -{discountPercentage * 100}%
            </span>
          </Maybe>
          <Maybe it={celebrity.availableForFlashDeliveries}>
            <FlashDeliveryBadgeLayout />
          </Maybe>
        </div>
      </div>
      <div className={styles.CelebrityCardInfo}>
        <h4 className={styles.CelebrityCardHeading}>
          <CountryFlag
            countryId={celebrity.countryId}
            alpha2Code={celebrity.alpha2Code}
            className="mr-2"
          />
          <TextWithOverflow
            textClassName={styles.CelebrityCardFullName}
            text={celebrity.fullName}
          />
        </h4>
        <Maybe it={Array.isArray(celebrity.hashtags)}>
          <p className={`text-with-ellipsis ${styles.CelebrityCardHashtags}`}>
            {getCelebrityHashtags(celebrity).map((hashtag) => (
              <Link href={getSearchHashtagPath(hashtag)} key={hashtag}>
                #{hashtag}{" "}
              </Link>
            ))}
          </p>
        </Maybe>
        <Maybe it={showPrice}>
          <p className={"text-with-ellipsis " + styles.CelebrityCardPrice}>
            <span
              className={classes(
                styles.VideoMessagePrice,
                hasDiscount && styles.RemovedPrice
              )}
            >
              <PriceLayout decimalScale={0} price={videoMessagePrice} />
            </span>{" "}
            <Maybe it={hasDiscount}>
              <span className={styles.DiscountPrice}>
                <PriceLayout decimalScale={0} price={discountPrice} />
              </span>
            </Maybe>
          </p>
        </Maybe>
      </div>
    </Link>
  );
}

export { CelebrityCard };
