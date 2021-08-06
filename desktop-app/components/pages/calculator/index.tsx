import React from "react";
import { CelebrityProfitCalculator } from "desktop-app/components/forms/celebrity-profit-calculator";
import styles from "./styles.module.scss";
import { FormattedMessage } from "lib/custom-intl";
import { useRouter } from "next/router";
import { CELEBRITY_REQUEST } from "constants/paths";
function CalculatorPage() {
  const { push } = useRouter();
  return (
    <div className={styles.Container}>
      <CelebrityProfitCalculator
        boxStyles={{
          paddingTop: "27px",
          paddingLeft: "47px",
          paddingRight: "41px",
          paddingBottom: "27px",
          backgroundColor: "white",
          boxShadow: "0px 10px 20px rgba(0, 0, 0 , 0.1)",

          borderRadius: "10px",
        }}
        monthlyProfitStyles={{
          textAlign: "center",
        }}
      >
        <button
          onClick={() => push(CELEBRITY_REQUEST)}
          className={`btn btn-primary ${styles.Button}`}
        >
          <FormattedMessage defaultMessage="Comenzar" />
        </button>
      </CelebrityProfitCalculator>
    </div>
  );
}

export { CalculatorPage };
