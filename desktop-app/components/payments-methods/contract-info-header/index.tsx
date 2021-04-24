import { ContractOccasion } from "desktop-app/components/common/widgets/contract-occasion";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import { occasionsData } from "react-app/src/constants/options";
import styles from "./styles.module.scss";

type ContractInfoHeaderProps = {
  occasion: string;
  celebrityAvatar: string;
  celebrityFullName: string;
};

function ContractInfoHeader({
  occasion,
  celebrityAvatar,
  celebrityFullName
}: ContractInfoHeaderProps) {
  return (
    <>
      <div className={styles.ContractInfoCelebrityInfo}>
        <ProfilePicture
          imageStyles={{
            height: 102,
            objectFit: "cover",
            marginRight: "40px"
          }}
          width={102}
          avatar={"/assets/img/hero-background.jpg" || celebrityAvatar}
        />
        <h1 className={styles.ContractInfoTitle}>
          Video personalizado de {celebrityFullName}
        </h1>
      </div>
      <ContractOccasion occasion={occasion} />
    </>
  );
}

export { ContractInfoHeader };
