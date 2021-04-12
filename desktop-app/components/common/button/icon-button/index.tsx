import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.scss";

type IconButtonProps = {
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function IconButton({ children, className = "", ...props }: IconButtonProps) {
  return (
    <button className={`btn ${styles.IconButton} ${className}`} {...props}>
      {children}
    </button>
  );
}

export { IconButton };
