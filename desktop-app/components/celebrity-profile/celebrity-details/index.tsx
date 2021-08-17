import { celebrityType } from "desktop-app/types/celebrityType";
import Maybe from "../../common/helpers/maybe";
import { CollapsibleText } from "../../common/helpers/collapsible-text";
import { WarrantyAd } from "../../common/widgets/warranty-ad";
import { DonorAlert } from "desktop-app/components/celebrity-profile/donor-alert";
import styles from "./styles.module.scss";
import { CelebrityHashtags } from "desktop-app/components/celebrity-profile/celebrity-hashtags";
import { CelebrityInfo } from "../celebrity-info";
import { CelebrityMainVideoWidget } from "desktop-app/components/celebrity-profile/celebrity-main-video-widget";
import { CelebrityFavoriteButton } from "desktop-app/components/celebrity-profile/celebrity-favorite-button";
import { ShareCelebrityDropdown } from "../share-celebrity-dropdown";

type CelebrityDetailsProps = {
  celebrity: celebrityType;
};

const mainVideoAvatarProps = {
  width: 220,
  height: 220,
};

function CelebrityDetails({ celebrity }: CelebrityDetailsProps) {
  return (
    <section className={styles.CelebrityDetails}>
      <header className={styles.CelebrityDetailsHeader}>
        <div className={styles.CelebrityDetailsTitle}>
          <h1>{celebrity.fullName}</h1>
          <ShareCelebrityDropdown celebrity={celebrity} />
          <CelebrityFavoriteButton
            celebrityId={celebrity.id}
            className={styles.CelebrityDetailsLike}
          />
        </div>
        <CelebrityInfo celebrity={celebrity} />
      </header>
      <div className={styles.CelebrityDetailsAvatarContainer}>
        <CelebrityMainVideoWidget
          celebrity={celebrity}
          className={styles.CelebrityDetailsMainVideo}
          avatarProps={mainVideoAvatarProps}
        />
        <WarrantyAd celebrityFullName={celebrity.fullName} />
      </div>
      <CollapsibleText className={styles.CelebrityDetailsDescription}>
        {celebrity.description}
      </CollapsibleText>
      <Maybe it={celebrity.isDonor}>
        <DonorAlert
          className={styles.CelebrityDetailsDonorAlert}
          fullName={celebrity.fullName}
          causeName={celebrity.causeName}
        />
      </Maybe>
      <CelebrityHashtags celebrity={celebrity} />
    </section>
  );
}

export { CelebrityDetails };
