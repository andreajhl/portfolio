import { ContractReviewCard } from "desktop-app/components/contract-review-card";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import { MyHiringsCardStepsBanner } from "../my-hirings-card-steps-banner";
import styles from "./styles.module.scss";

type MyHiringsCardBodyRightSideProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCardBodyRightSide({
  contractData,
}: MyHiringsCardBodyRightSideProps) {
  return (
    <>
      {/* <MyHiringsCardStepsBanner contractData={contractData} /> */}
      <ContractReviewCard contractData={contractData} />
    </>
  );
}

export { MyHiringsCardBodyRightSide };
