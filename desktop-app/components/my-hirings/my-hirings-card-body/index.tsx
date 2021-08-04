import { MyHiringsCardBodyLeftSide } from "desktop-app/components/my-hirings/my-hirings-card-body-left-side";
import { contractIsCancelled } from "desktop-app/constants/contractStatuses";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import { MyHiringsCardBodyRightSide } from "../my-hirings-card-body-right-side";
import classes from "classnames";
import styles from "./styles.module.scss";

type MyHiringsCardBodyProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCardBody({ contractData }: MyHiringsCardBodyProps) {
  const isCancelled = contractIsCancelled(contractData.status);

  return (
    <div className={styles.MyHiringsCardBody}>
      <div
        className={classes(
          styles.MyHiringsCardBodyLeftSideContainer,
          isCancelled && styles.MyHiringsCardBodyLeftSideCancelled
        )}
      >
        <MyHiringsCardBodyLeftSide contractData={contractData} />
      </div>
      <div className={styles.MyHiringsCardBodyRightSideContainer}>
        <MyHiringsCardBodyRightSide contractData={contractData} />
      </div>
    </div>
  );
}

export { MyHiringsCardBody };
