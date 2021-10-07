import { ContractOccasion } from "desktop-app/components/common/widgets/contract-occasion";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

const textBold = (chunks: string) => <b>{chunks}</b>;

type ContractInfoHeaderProps = {
  occasion: string;
  celebrityAvatar: string;
  celebrityFullName: string;
};

function ContractInfoHeaderV2({
  occasion,
  celebrityAvatar,
  celebrityFullName,
}: ContractInfoHeaderProps) {
  return (
    <>
      <div className={styles.ContractInfoCelebrityInfoDiv}>
        <div className={styles.ContractInfoCelebrityInfo}>
          <ProfilePicture
            imageStyles={{
              height: 124,
              objectFit: "cover",
            }}
            width={124}
            avatar={celebrityAvatar || "/assets/img/avatar-blank.png"}
          />
          <div>
            <h1 className={styles.ContractInfoTitle}>
              <FormattedMessage
                defaultMessage="Tu video personalizado de <textBold>{celebrityFullName}</textBold>, está en camino!"
                values={{
                  textBold,
                  celebrityFullName,
                }}
              />
            </h1>
            <label>
              <hr />
            </label>
          </div>
        </div>
      </div>
      <ContractOccasion
        className={styles.ContractInfoHeaderV2Occasion}
        occasion={occasion}
      />
    </>
  );
}

export { ContractInfoHeaderV2 };
