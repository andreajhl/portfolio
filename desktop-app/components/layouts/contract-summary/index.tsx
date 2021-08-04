import { XIcon } from "desktop-app/components/common/icons";
import React from "react";
import styles from "./styles.module.scss";
type ContractSummaryLayoutProps = {
  header: React.ReactNode;
  contractDetails: React.ReactNode;
  instructions: React.ReactNode;
};

function ContractSummaryLayout({
  header,
  contractDetails,
  instructions
}: ContractSummaryLayoutProps) {
  return (
    <>
      <div className={styles.Header}>{header}</div>
      <div className={styles.ContractSummaryDetails}>
        <div className={styles.ContractDetails}>{contractDetails}</div>
        <div className={styles.ContractInstructions}>{instructions}</div>
      </div>
    </>
  );
}

export default ContractSummaryLayout;
