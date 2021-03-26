import ContractVideo from "desktop-app/components/common/cards/contract-video";
import VideoFooter from "desktop-app/components/common/cards/video/footer";
import { ContractVideoProps } from "desktop-app/types/ContractVideoProps";
import React from "react";
import styles from "./styles.module.scss";

type CelebritySectionVideoCardProps = {
  avatar: string;
  fullName: string;
  username: string;
  className?: string;
  style?: object;
} & ContractVideoProps;

const CelebritySectionVideoCard = ({
  videoPosterUrl,
  videoUrl,
  occasion,
  avatar,
  fullName,
  username
}: CelebritySectionVideoCardProps) => {
  return (
    <div className={styles.CelebritySectionVideoCard}>
      <ContractVideo
        videoPosterUrl={videoPosterUrl}
        videoUrl={videoUrl}
        occasion={occasion}
      ></ContractVideo>
      <VideoFooter avatarURL={avatar} fullName={fullName} userName={username} />
    </div>
  );
};

export default CelebritySectionVideoCard;
