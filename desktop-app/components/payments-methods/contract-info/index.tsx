import { ContractDataForm } from "desktop-app/components/payments-methods/contract-data-form";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import { occasionsData } from "react-app/src/constants/options";
import styles from "./styles.module.scss";

type ContractInfoProps = {
  celebrityAvatar: string;
  celebrityFullName: string;
  occasion: string;
  deliveryTo: string;
  deliveryFrom: string;
  instructions: string;
};

function ContractInfo({
  celebrityAvatar,
  celebrityFullName,
  occasion,
  deliveryTo,
  deliveryFrom,
  instructions
}: ContractInfoProps) {
  const occasionKey = occasion || "OTHER";
  const contractOccasion = occasionsData[occasionKey];

  return (
    <div className={styles.ContractInfo}>
      <header
        className={`${styles.ContractInfoSection} ${styles.ContractInfoHeader}`}
      >
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
        <div className={styles.ContractInfoOccasion}>
          <div className={styles.ContractInfoOccasionIcon}>
            <img
              src={`/assets/img/occasions/${occasionKey}.png`}
              alt={contractOccasion.title}
            />
          </div>
          {contractOccasion.title}
        </div>
      </header>
      <div
        className={`${styles.ContractInfoSection} ${styles.ContractInfoData}`}
      >
        <ContractDataForm
          deliveryTo={deliveryTo}
          deliveryFrom={deliveryFrom || "Prueba Prueba"}
          instructions={instructions}
        />
      </div>
      <div
        className={`${styles.ContractInfoSection} ${styles.ContractInfoPricing}`}
      >
        Total
      </div>
    </div>
  );
}

export { ContractInfo };
