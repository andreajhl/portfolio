import { Children, ReactNode } from "react";
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

function Sidebar({ children, width = 100 }) {
  return (
    <aside className={styles.Sidebar} style={{ width }}>
      {children}
    </aside>
  );
}

function MainContent({ children }) {
  return <main className={styles.MainContent}>{children}</main>;
}

export { SidebarWrapper, Sidebar, MainContent };
