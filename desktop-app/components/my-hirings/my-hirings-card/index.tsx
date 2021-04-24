import { MyHiringsCardHeader } from "../my-hirings-card-header";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import styles from "./styles.module.scss";
import { MyHiringsCardBody } from "desktop-app/components/my-hirings/my-hirings-card-body";

type MyHiringsCardProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCard({ contractData }: MyHiringsCardProps) {
  console.log(contractData);
  return (
    <div className={styles.MyHiringsCard}>
      <MyHiringsCardHeader contractData={contractData} />
      <MyHiringsCardBody contractData={contractData} />
    </div>
  );
}

export { MyHiringsCard };
