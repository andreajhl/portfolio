import { CelebrityCard } from "desktop-app/components/common/cards/celebrity";
import React from "react";
import ReelSection from "../reel-section";
import styles from "./styles.module.scss";

const CelebrityContractCardReel = ({ reelTitle }) => {
  return (
    <div className={styles.CelebrityContractCardReel}>
      <div className={styles.CelebrityContractCardReelDetails}>
        <p>{reelTitle}</p>
        <span className={styles.ShowMoreButton}>Ver Mas</span>
      </div>
      <ReelSection height={288} itemSize={186} itemCount={15}>
        {({ style }) => (
          <div style={style}>
            <CelebrityCard />
          </div>
        )}
      </ReelSection>
    </div>
  );
};

export default CelebrityContractCardReel;
