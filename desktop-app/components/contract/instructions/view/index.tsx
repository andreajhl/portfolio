import Maybe from "desktop-app/components/common/helpers/maybe";
import { PencilIcon } from "desktop-app/components/common/icons";
import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";

function ContractInstructionsView({
  deliveryTo,
  deliveryFrom,
  instructions,
  onToggleEdit,
}) {
  return (
    <div className={styles.ContractInstructions}>
      <button
        onClick={onToggleEdit}
        className={classes("btn", styles.PencilIcon)}
      >
        <PencilIcon />
      </button>
      <div>
        <span className={styles.WhoReceive}>Para: {deliveryTo}</span>
        <Maybe
          it={typeof deliveryFrom === "string" && deliveryFrom === "string"}
        >
          <span className={styles.WhoSend}>De: {deliveryFrom}</span>
        </Maybe>
      </div>
      <span className={styles.InstructionsDetails}>{instructions}</span>
    </div>
  );
}

export default ContractInstructionsView;
