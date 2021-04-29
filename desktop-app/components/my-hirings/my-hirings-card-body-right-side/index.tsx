import { ContractReviewCard } from "desktop-app/components/my-hirings/contract-review-card";
import {
  COMPLETED,
  contractIsCancelled,
} from "desktop-app/constants/contractStatuses";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import React from "react";
import { ApologyBanner } from "../apology-banner";
import { MyHiringsCardStepsBanner } from "../my-hirings-card-steps-banner";
import styles from "./styles.module.scss";

type MyHiringsCardBodyRightSideProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCardBodyRightSide({
  contractData,
}: MyHiringsCardBodyRightSideProps) {
  const { status } = contractData;

  if (status === COMPLETED) {
    return <ContractReviewCard contractData={contractData} />;
  }

  if (contractIsCancelled(status)) {
    return <ApologyBanner contractData={contractData} />;
  }

  return <MyHiringsCardStepsBanner contractData={contractData} />;
}

export { MyHiringsCardBodyRightSide };
