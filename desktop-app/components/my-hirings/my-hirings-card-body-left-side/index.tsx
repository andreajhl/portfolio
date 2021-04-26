import MyHiringsContract from "desktop-app/types/myHiringsContract";
import { ContractIsPublicChanger } from "../contract-is-public-changer";
import { MyHiringsCardDetails } from "../my-hirings-card-details";
import styles from "./styles.module.scss";

type MyHiringsCardBodyLeftSideProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCardBodyLeftSide({
  contractData,
}: MyHiringsCardBodyLeftSideProps) {
  return (
    <>
      <MyHiringsCardDetails contractData={contractData} />
      <ContractIsPublicChanger
        className={styles.MyHiringsCardBodyLeftSideIsPublicChanger}
        contractStatus={contractData.status}
        contractId={contractData.id}
        contractIsPublic={contractData.isPublic}
        contractReference={contractData.reference}
        celebrityId={contractData.celebrityId}
      />
    </>
  );
}

export { MyHiringsCardBodyLeftSide };
