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
import { DiscountPercentageBadge } from "desktop-app/components/common/widgets/discount-percentage-badge";
import { analytics } from "react-app/src/state/utils/gtm";
import { useIntl } from "react-intl";
import getTranslatedCategoryTitle from "lib/utils/getTranslatedCategoryTitle";
import { celebrityIsUnavailable } from "lib/utils/celebrityUtils";
import LazyLoadingImage from "react-app/src/components/common/lazy-loading-image";

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
  onClickLink?: (event: any) => void;
};

function CelebrityCard({
  celebrity,
  thumbnailWidth = 170,
  thumbnailHeight = 210,
  showPrice = true,
  onClickLink,
}: CelebrityCardProps) {
  const { formatMessage } = useIntl();
  const { isFavorite, toggleFavorite } = useCelebrityFavorite(celebrity.id);
  const { videoMessagePrice } = celebrity;
  const discountPercentage = getCelebrityDiscountPercentage(celebrity);
  const hasDiscount = discountPercentage > 0;
  const discountPrice =
    videoMessagePrice - videoMessagePrice * discountPercentage;

  const celebrityProfileLink = getCelebrityProfilePath(celebrity.username);

  const trackHashtagClick = function (hashtag: string) {
    analytics.track("CLICK_CELEBRITY_CARD_HASHTAG", { hashtag, celebrity });
  };

  function trackCountryFlagClick() {
    analytics.track("CLICK_CELEBRITY_CARD_COUNTRY_FLAG", {
      celebrity,
    });
  }

  const categoryTitle = getTranslatedCategoryTitle(
    celebrity?.title,
    formatMessage
  );

  return (
    <div
      className={`${styles.CelebrityCard} ${parentElementClass}`}
      style={{ width: thumbnailWidth }}
    >
      <div className={styles.CelebrityCardThumbnail}>
        <Link
          href={celebrityProfileLink}
          className={styles.CelebrityCardProfileLink}
          onClick={onClickLink}
        >
          <LazyLoadingImage
            alt={`${categoryTitle} - ${celebrity.fullName}`}
            className={styles.CelebrityCardAvatar}
            src={celebrity.avatar}
            height={thumbnailHeight}
            style={{ objectFit: "cover" }}
            width={thumbnailWidth}
            placeholderSrc="/assets/img/avatar-blank.png"
          />
        </Link>
        <div className={styles.CelebrityCardThumbnailHeader}>
          <Maybe it={hasDiscount}>
            <DiscountPercentageBadge
              discountPercentage={discountPercentage}
              className={styles.CelebrityCardDiscountPercentage}
            />
          </Maybe>
          <Maybe it={celebrity.availableForFlashDeliveries}>
            <FlashDeliveryBadgeLayout />
          </Maybe>
        </div>
        <div className={styles.CelebrityCardThumbnailFooter}>
          <Maybe it={Boolean(categoryTitle)}>
            <Link
              href={getSearchCategoryPath(celebrity.categoryId)}
              onClick={onClickLink}
            >
              <span className={styles.CelebrityCardCategory}>
                {categoryTitle}
              </span>
            </Link>
          </Maybe>
          <LikeButton
            className={styles.CelebrityCardLikeButton}
            isFavorite={isFavorite}
            onClick={(event) => {
              preventRedirectFromParent(event);
              toggleFavorite();
            }}
          />
        </div>
      </div>
      <div className={styles.CelebrityCardInfo}>
        <h4 className={styles.CelebrityCardHeading}>
          <CountryFlag
            countryId={celebrity.countryId}
            alpha2Code={celebrity.alpha2Code}
            className="mr-2"
            onClick={trackCountryFlagClick}
          />
          <Link
            href={celebrityProfileLink}
            className={styles.CelebrityCardFullNameLink}
            onClick={onClickLink}
          >
            <TextWithOverflow
              textClassName={styles.CelebrityCardFullName}
              text={celebrity.fullName}
            />
          </Link>
        </h4>
        <Maybe it={Array.isArray(celebrity.hashtags)}>
          <p className={`text-with-ellipsis ${styles.CelebrityCardHashtags}`}>
            {getCelebrityHashtags(celebrity).map((hashtag) => (
              <Link
                href={getSearchHashtagPath(hashtag)}
                key={hashtag}
                onClick={() => trackHashtagClick(hashtag)}
              >
                #{hashtag}{" "}
              </Link>
            ))}
          </p>
        </Maybe>
        <Maybe it={showPrice && !celebrityIsUnavailable(celebrity.status)}>
          <Link
            href={celebrityProfileLink}
            className={styles.CelebrityCardProfileLink}
            onClick={onClickLink}
          >
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
          </Link>
        </Maybe>
      </div>
    </div>
  );
}

export { CelebrityCard };
