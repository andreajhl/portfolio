import { Children, ReactNode, StyleHTMLAttributes } from "react";
import classes from "classnames";
import styles from "./styles.module.scss";

type SidebarWrapperProps = {
  children: ReactNode;
  isOpen: boolean;
};

function SidebarWrapper({ children, isOpen }: SidebarWrapperProps) {
  return (
    <div
      className={classes(
        styles.SidebarWrapper,
        !isOpen && styles.SidebarWrapperIsClosed
      )}
    >
      {Children.map(children, (child) => (isAllowed(child) ? child : null))}
    </div>
  );
}

function isAllowed(child: { type: any }) {
  return child.type && [Sidebar, MainContent].includes(child.type);
}

type SidebarProps = {
  children: ReactNode;
  width: string | number;
  className?: string;
};

function Sidebar({ children, width = 100, className = "" }: SidebarProps) {
  return (
    <aside className={classes(styles.Sidebar, className)} style={{ width }}>
      {children}
    </aside>
  );
}

function MainContent({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={classes(styles.MainContent, className)}>{children}</main>
  );
}

export { SidebarWrapper, Sidebar, MainContent };
