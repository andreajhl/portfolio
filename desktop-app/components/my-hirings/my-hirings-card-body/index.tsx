import { MyHiringsCardBodyLeftSide } from "desktop-app/components/my-hirings/my-hirings-card-body-left-side";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import { MyHiringsCardBodyRightSide } from "../my-hirings-card-body-right-side";
import styles from "./styles.module.scss";

type MyHiringsCardBodyProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCardBody({ contractData }: MyHiringsCardBodyProps) {
  return (
    <div className={styles.MyHiringsCardBody}>
      <div className={styles.MyHiringsCardBodyLeftSideContainer}>
        <MyHiringsCardBodyLeftSide contractData={contractData} />
      </div>
      <div className={styles.MyHiringsCardBodyRightSideContainer}>
        <MyHiringsCardBodyRightSide contractData={contractData} />
      </div>
    </div>
  );
}

export { MyHiringsCardBody };
