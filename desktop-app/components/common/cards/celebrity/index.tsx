import {
  getCelebrityProfilePath,
  getSearchCategoryPath
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

type CelebrityCardProps = {
  celebrity: celebrityType;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  showPrice?: boolean;
};

// function TextWithOverflow({
//   celebrityFullName
// }: {
//   celebrityFullName: string;
// }) {
//   const spanRef = useRef<HTMLSpanElement>(null);
//   const [hiddenPortionWidthInPx, setHiddenPortionWidthInPx] = useState(
//     (celebrityFullName.length - 18) * 8
//   );

//   useEffect(() => {
//     if (!spanRef.current) return;
//     setHiddenPortionWidthInPx(
//       spanRef.current?.scrollWidth - spanRef.current?.offsetWidth + 1 // to give a little of space to garante that nothing is hidden
//     );
//   }, []);

//   return (
//     <div className={styles.CelebrityCardFullName}>
//       <span
//         ref={spanRef}
//         style={{
//           transform: `translateX(-${hiddenPortionWidthInPx}px)`
//         }}
//       >
//         {celebrityFullName}
//       </span>
//     </div>
//   );
// }

function CelebrityCard({
  celebrity,
  thumbnailWidth = 170,
  thumbnailHeight = 210,
  showPrice = true
}: CelebrityCardProps) {
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
          <p className={styles.CelebrityCardHashtags}>
            {celebrity?.hashtags
              ?.filter?.((hashtag, index, { length }) => {
                if (index !== 0 || length === 1) return true;
                const hashtagRegExp = new RegExp(hashtag, "gi");
                return !hashtagRegExp.test(celebrity.title);
              })
              .map((hashtag) => (
                <Link href={hashtag}>#{hashtag.replace("#", "")} </Link>
              ))}
          </p>
        </Maybe>
        <Maybe it={showPrice}>
          <p className={"text-with-ellipsis " + styles.CelebrityCardPrice}>
            <PriceLayout decimalScale={0} price={celebrity.videoMessagePrice} />
          </p>
        </Maybe>
      </div>
    </Link>
  );
}

export { CelebrityCard };
