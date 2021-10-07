import getArrayOfLength from "lib/utils/getArrayOfLength";
import Skeleton from "react-loading-skeleton";
import styles from "./styles.module.scss";

function PaymentMethodsAvailableListSkeleton() {
  return (
    <>
      {getArrayOfLength(3).map((_, index) => (
        <div className={styles.PaymentMethodsAvailable} key={index}>
          <Skeleton width="100%" height="50px" />
        </div>
      ))}
    </>
  );
}

export default PaymentMethodsAvailableListSkeleton;
