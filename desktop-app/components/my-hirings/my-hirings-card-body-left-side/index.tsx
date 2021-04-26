import MyHiringsContract from "desktop-app/types/myHiringsContract";
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
    </>
  );
}

export { MyHiringsCardBodyLeftSide };
