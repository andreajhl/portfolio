import { FormattedMessage } from "lib/custom-intl";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import CSS from "csstype";
const amountMessagesOptions = [10, 20, 30, 60, 90, 120];
const priceOptions = [10, 20, 40, 60, 80, 100];

interface CelebrityProfitCalculatorProps {
  boxStyles: CSS.Properties;
  monthlyProfitStyles?: CSS.Properties;
  children?: React.ReactNode;
}

function CelebrityProfitCalculator({
  boxStyles,
  children,
  monthlyProfitStyles,
}: CelebrityProfitCalculatorProps) {
  const [amountMessages, setAmountMessages] = useState(
    amountMessagesOptions[0]
  );
  const [priceVideoMessage, setPriceVideoMessage] = useState(priceOptions[0]);

  const monthlyProfit = amountMessages * priceVideoMessage;
  return (
    <div className={styles.MainBox} style={{ ...boxStyles }}>
      <h2 className={styles.Heading}>
        <FormattedMessage defaultMessage="Calcula cuánto puedes ganar en un mes con Famosos" />
      </h2>
      <div>
        <select
          className={styles.FormSelect}
          style={{ flex: 1 }}
          onChange={(e) => setAmountMessages(Number(e.target.value))}
        >
          {amountMessagesOptions.map((option) => {
            return (
              <option
                key={option}
                value={option}
                selected={option === amountMessages}
              >
                {`${option} videomensajes`}
              </option>
            );
          })}
        </select>
        <select
          className={styles.FormSelect}
          style={{ flex: 1 }}
          onChange={(e) => setPriceVideoMessage(Number(e.target.value))}
        >
          {priceOptions.map((option) => {
            return (
              <option
                key={option}
                value={option}
                selected={option === priceVideoMessage}
              >
                {`${option} USD`}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.MonthlyProfit} style={{ ...monthlyProfitStyles }}>
        ${monthlyProfit} USD
      </div>
      {children}
    </div>
  );
}

export { CelebrityProfitCalculator };
