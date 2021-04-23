import { MyHiringsCardHeader } from "../my-hirings-card-header";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import styles from "./styles.module.scss";

type MyHiringsCardProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCard({ contractData }: MyHiringsCardProps) {
  console.log(contractData);
  return (
    <div className={styles.MyHiringsCard}>
      <MyHiringsCardHeader contractData={contractData} />
    </div>
  );
}

export { MyHiringsCard };
