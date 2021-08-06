import { ReactNode, useEffect, useState } from "react";
import { CheckIcon } from "../check-icon";
import { XIcon } from "../icons";
import { LoadingSpinner } from "../loading-spinner";
import styles from "./styles.module.scss";

export type StatusType = "idle" | "loading" | "completed" | "rejected";

type SubmitStatusProps = {
  baseText?: ReactNode;
  status?: StatusType;
};

function SubmitStatus({ status = "idle" }: SubmitStatusProps) {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    let timer1;
    if (status === "completed") {
      timer1 = setTimeout(() => setHide(true), 2000);
    } else {
      setHide(false);
    }
    return () => {
      clearTimeout(timer1);
    };
  }, [status]);

  if (status === "loading") return <LoadingSpinner />;

  if (status === "completed" && !hide)
    return <CheckIcon className={styles.CheckIcon} />;

  return null;
}

export { SubmitStatus };
