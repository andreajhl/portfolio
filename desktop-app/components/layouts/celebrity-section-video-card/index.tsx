import ContractVideo from "desktop-app/components/common/cards/contract-video";
import VideoFooter from "desktop-app/components/common/cards/video/footer";
import { celebrityType } from "desktop-app/types/celebrityType";
import React from "react";
import styles from "./styles.module.scss";

type CelebritySectionVideoCardProps = {
  celebrity: celebrityType & {
    videoUrl: string;
    videoPosterUrl: string;
    occasion: string;
  };
  className?: string;
  style?: object;
};

const CelebritySectionVideoCard = ({
  celebrity
}: CelebritySectionVideoCardProps) => {
  return (
    <div className={styles.CelebritySectionVideoCard}>
      <ContractVideo celebrity={celebrity}></ContractVideo>
      <VideoFooter
        avatarURL={celebrity.avatar}
        fullName={celebrity.fullName}
        userName={celebrity.username}
      />
    </div>
  );
};

export default CelebritySectionVideoCard;
