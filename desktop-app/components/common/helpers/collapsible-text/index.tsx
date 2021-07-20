import { useState } from "react";
import limitString from "react-app/src/utils/limitString";
import Collapse from "react-bootstrap/Collapse";
import classes from "classnames";
import styles from "./styles.module.scss";
import Maybe from "../maybe";
import { FormattedMessage } from "react-intl";

export function CollapsibleText({
  children,
  className = "",
  lengthLimit = 200,
}: {
  children: string;
  className?: string;
  lengthLimit?: number;
}) {
  const [isCollapse, setIsCollapse] = useState(true);
  const [hasFinishCollapsing, setHasFinishCollapsing] = useState(true);

  function toggleCollapse() {
    if (isCollapse) setHasFinishCollapsing(false);
    setIsCollapse((isCollapse) => !isCollapse);
  }

  function finishCollapsing() {
    setHasFinishCollapsing(true);
  }

  return (
    <Collapse in={!isCollapse} onExited={finishCollapsing} timeout={350}>
      <p className={classes(styles.CollapsibleText, className)}>
        <Maybe it={hasFinishCollapsing} orElse={children}>
          {limitString(children, lengthLimit)}
        </Maybe>{" "}
        <Maybe it={children.length > lengthLimit}>
          <span
            className="font-weight-bold cursor-pointer"
            onClick={toggleCollapse}
          >
            <Maybe
              it={isCollapse}
              orElse={<FormattedMessage defaultMessage="Mostrar menos" />}
            >
              <FormattedMessage defaultMessage="Mostrar más" />
            </Maybe>
          </span>
        </Maybe>
      </p>
    </Collapse>
  );
}
