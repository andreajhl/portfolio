import { MyHiringsCardHeader } from "../my-hirings-card-header";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import styles from "./styles.module.scss";
import { MyHiringsCardBody } from "desktop-app/components/my-hirings/my-hirings-card-body";

type MyHiringsCardProps = {
  className?: string;
  contractData: MyHiringsContract;
};

function MyHiringsCard({ className = "", contractData }: MyHiringsCardProps) {
  return (
    <div className={`${styles.MyHiringsCard} ${className}`}>
      <MyHiringsCardHeader contractData={contractData} />
      <MyHiringsCardBody contractData={contractData} />
    </div>
  );
}

export { MyHiringsCard };
