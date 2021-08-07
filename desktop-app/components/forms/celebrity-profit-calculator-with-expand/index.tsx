import { useMediaQuery } from "lib/hooks/useMediaQuery";
import React, { useEffect } from "react";
import { useState } from "react";
import { CelebrityProfitCalculator } from "../celebrity-profit-calculator";
import styles from "./styles.module.scss";
function CelebrityProfitCalculatorWithExpand() {
  const isPageWide = useMediaQuery("(min-width: 800px)");
  const [expandForm, setExpandForm] = useState(isPageWide);
  useEffect(() => {
    setExpandForm(isPageWide);
  }, [isPageWide]);

  if (expandForm) {
    return (
      <CelebrityProfitCalculator
        boxStyles={{
          paddingTop: "27px",
          paddingLeft: "47px",
          paddingRight: "41px",
          paddingBottom: "27px",
        }}
      />
    );
  }
  return (
    <button
      style={{
        border: "#6970c6 !important",
      }}
      className={`${styles.ExpandButton}`}
      onClick={() => setExpandForm(() => true)}
    >
      Calcula tus ingresos en Famosos
    </button>
  );
}

export { CelebrityProfitCalculatorWithExpand };
