import MyHiringsContract from "desktop-app/types/myHiringsContract";
import { MyHiringsCardDetails } from "../my-hirings-card-details";
import styles from "./styles.module.scss";

type MyHiringsCardBodyProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCardBody({ contractData }: MyHiringsCardBodyProps) {
  return (
    <div className={styles.MyHiringsCardBody}>
      <div className={styles.MyHiringsCardBodyLeftSide}>
        <MyHiringsCardDetails contractData={contractData} />
      </div>
      <div className={styles.MyHiringsCardBodyRightSide}>world</div>
    </div>
  );
}

export { MyHiringsCardBody };
