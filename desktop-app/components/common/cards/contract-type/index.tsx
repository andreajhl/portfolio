import React from "react";
import { SparklesIcon, GiftBox, BusinessBriefcase } from "../../icons";
import styles from "./styles.module.scss";
import classes from "classnames";

const AVAILABLE_OPTIONS = [
  {
    id: 1,
    text: "Para mi",
    Icon: <SparklesIcon />,
    styles: { backgroundColor: "rgba(255, 235, 244, 1)" },
  },
  {
    id: 2,

    text: "Para un amigo o familiar",
    Icon: <GiftBox />,
    styles: { backgroundColor: "rgba(229,231,255,1)" },
  },
  {
    id: 3,
    text: "Para mi negocio",
    Icon: <BusinessBriefcase />,
    styles: { backgroundColor: "rgba(227,248,255,1)" },
  },
];

type ContractTypeCardsProps = {
  onChangeType: (arg: number) => void;
  currentType?: number;
};
function ContractTypeCards({
  onChangeType,
  currentType,
}: ContractTypeCardsProps) {
  return (
    <div className={styles.ContractTypeCards}>
      {AVAILABLE_OPTIONS.map((option) => {
        const optionIsSelected = currentType === option.id;
        function changeContractType() {
          if (optionIsSelected) return;
          onChangeType(option.id);
        }
        return (
          <div
            key={option.id}
            onClick={changeContractType}
            className={classes(
              styles.Card,
              optionIsSelected && styles[`CardActive${option.id}`]
            )}
            style={{ ...option.styles }}
          >
            <div className={styles.IconBox}>{option.Icon}</div>
            <span>{option.text}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ContractTypeCards;
