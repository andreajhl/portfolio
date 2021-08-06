import { celebrityType } from "desktop-app/types/celebrityType";
import Maybe from "../maybe";
import { PriceLayout } from "../price-layout";
import classes from "classnames";
import styles from "./styles.module.scss";
import { DiscountPercentageBadge } from "../../widgets/discount-percentage-badge";

const getVideoMessageContractType = (contractsTypes) =>
  contractsTypes?.find?.((contract) => contract.contractType === 1);

type CelebrityVideoContractPriceProps = {
  celebrity: celebrityType;
  decimalScale?: number;
};

function CelebrityVideoContractPrice({
  celebrity,
  decimalScale = 0,
}: CelebrityVideoContractPriceProps) {
  const videoMessageContractType = getVideoMessageContractType(
    celebrity.contractTypes
  );
  const videoMessagePrice = videoMessageContractType?.price ?? 0;
  const discountPercentage = videoMessageContractType?.discountPercentage ?? 0;
  const hasDiscount = discountPercentage > 0;
  const discountPrice =
    videoMessagePrice - videoMessagePrice * discountPercentage;

  return (
    <>
      <Maybe it={hasDiscount}>
        <DiscountPercentageBadge
          discountPercentage={discountPercentage}
          className={styles.DiscountPercentage}
        />
      </Maybe>
      <span
        className={classes(styles.Price, hasDiscount && styles.RemovedPrice)}
      >
        <PriceLayout decimalScale={decimalScale} price={videoMessagePrice} />
      </span>
      <Maybe it={hasDiscount}>
        <PriceLayout decimalScale={decimalScale} price={discountPrice} />
      </Maybe>
    </>
  );
}

export { CelebrityVideoContractPrice };
