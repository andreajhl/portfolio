import Maybe from "desktop-app/components/common/helpers/maybe";
import { PencilIcon } from "desktop-app/components/common/icons";
import React from "react";
import styles from "./styles.module.scss";
import classes from "classnames";
import { FormattedMessage } from "react-intl";

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
        <span className={styles.WhoReceive}>
          <FormattedMessage
            defaultMessage="Para: {deliveryTo}"
            values={{ deliveryTo }}
          />
        </span>
        <Maybe it={typeof deliveryFrom === "string" && deliveryFrom !== ""}>
          <span className={styles.WhoSend}>
            <FormattedMessage
              defaultMessage="De: {deliveryFrom}"
              values={{ deliveryFrom }}
            />
          </span>
        </Maybe>
      </div>
      <span className={styles.InstructionsDetails}>{instructions}</span>
    </div>
  );
}

export default ContractInstructionsView;
