import MyHiringsContract from "desktop-app/types/myHiringsContract";
import { MyHiringsCardStepsBanner } from "../my-hirings-card-steps-banner";
import styles from "./styles.module.scss";

type MyHiringsCardBodyRightSideProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCardBodyRightSide({
  ...props
}: MyHiringsCardBodyRightSideProps) {
  return (
    <>
      <MyHiringsCardStepsBanner />
    </>
  );
}

export { MyHiringsCardBodyRightSide };
