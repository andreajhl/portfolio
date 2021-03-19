import { CelebrityCard } from "desktop-app/components/common/cards/celebrity";
import React from "react";
import ContractVideo from "../contract-video";
import ReelSection from "../reel-section";
import styles from "./styles.module.scss";

const CelebrityContractVideoReel = ({ reelTitle }) => {
  return (
    <div className={styles.ContractVideoReel}>
      <p>{reelTitle}</p>
      <ReelSection height={400} itemSize={290} itemCount={15}>
        {({ style }) => (
          <div style={style}>
            <ContractVideo />
          </div>
        )}
      </ReelSection>
    </div>
  );
};

export default CelebrityContractVideoReel;
