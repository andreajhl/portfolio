import { ContractVideo } from "desktop-app/components/common/cards/contract-video";
import VideoFooter from "desktop-app/components/common/cards/video/footer";
import { ContractVideoType } from "desktop-app/types/contractVideoType";
import { CSSProperties } from "react";
import styles from "./styles.module.scss";

type CelebritySectionVideoCardProps = {
  className?: string;
  contract_reference: string;
  style?: CSSProperties;
} & ContractVideoType;

function CelebritySectionVideoCard({
  videoPosterUrl,
  videoUrl,
  occasion,
  avatar,
  fullName,
  username,
  contract_reference,
}: CelebritySectionVideoCardProps) {
  return (
    <div className={styles.CelebritySectionVideoCard}>
      <ContractVideo
        videoPosterUrl={videoPosterUrl}
        videoUrl={videoUrl}
        occasion={occasion}
        contract_reference={contract_reference}
      />
      <VideoFooter avatarURL={avatar} fullName={fullName} userName={username} />
    </div>
  );
}

export default CelebritySectionVideoCard;
