import { ReactNode } from "react";
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
  if (status === "loading") return <LoadingSpinner />;

  if (status === "completed") return <CheckIcon className={styles.CheckIcon} />;

  return null;
}

export { SubmitStatus };
