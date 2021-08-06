import { ContractOccasion } from "desktop-app/components/common/widgets/contract-occasion";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import { occasionsData } from "react-app/src/constants/options";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";

type ContractInfoHeaderProps = {
  occasion: string;
  celebrityAvatar: string;
  celebrityFullName: string;
};

function ContractInfoHeader({
  occasion,
  celebrityAvatar,
  celebrityFullName,
}: ContractInfoHeaderProps) {
  return (
    <>
      <div className={styles.ContractInfoCelebrityInfo}>
        <ProfilePicture
          imageStyles={{
            height: 102,
            objectFit: "cover",
          }}
          width={102}
          avatar={celebrityAvatar || "/assets/img/avatar-blank.png"}
        />
        <h1 className={styles.ContractInfoTitle}>
          <FormattedMessage
            defaultMessage="Video personalizado de {celebrityFullName}"
            values={{
              celebrityFullName,
            }}
          />
        </h1>
      </div>
      <ContractOccasion occasion={occasion} />
    </>
  );
}

export { ContractInfoHeader };
