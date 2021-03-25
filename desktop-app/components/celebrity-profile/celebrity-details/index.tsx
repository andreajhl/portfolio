import { LikeButton } from "desktop-app/components/common/button/like";
import OptimizedImage from "desktop-app/components/common/helpers/optimized-image";
import { celebrityType } from "desktop-app/types/celebrityType";
import Maybe from "../../common/helpers/maybe";
import { CollapsibleText } from "../../common/helpers/collapsible-text";
import { WarrantyAd } from "../warranty-ad";
import { DonorAlert } from "desktop-app/components/celebrity-profile/donor-alert";
import styles from "./styles.module.scss";
import { CelebrityHashtags } from "desktop-app/components/celebrity-profile/celebrity-hashtags";
import { CelebrityInfo } from "../celebrity-info";

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
        <CelebrityInfo celebrity={celebrity} />
      </header>
      <div className={styles.CelebrityDetailsAvatarContainer}>
        <OptimizedImage
          className={styles.CelebrityDetailsAvatar}
          placeholderSrc="/assets/img/avatar-blank.png"
          src={celebrity.avatar}
          width={220}
          height={220}
        />
        <WarrantyAd />
      </div>
      <CollapsibleText className={styles.CelebrityDetailsDescription}>
        {celebrity.description}
      </CollapsibleText>
      <Maybe it={celebrity.isDonor}>
        <DonorAlert
          fullName={celebrity.fullName}
          causeName={celebrity.causeName}
        />
      </Maybe>
      <CelebrityHashtags hashtags={celebrity.hashtags} />
    </section>
  );
}

export { CelebrityDetails };
