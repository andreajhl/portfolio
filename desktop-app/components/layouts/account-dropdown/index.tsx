import { Dropdown } from "../../common/button/dropdown";
import {
  AvatarIcon,
  HelpIcon,
  PlayIcon,
  StarIcon,
  UserIcon
} from "desktop-app/components/common/icons";
import { ReactNode } from "react";
import { NavLink } from "desktop-app/components/common/routing/nav-link";
import styles from "./styles.module.scss";

type MenuItemType = {
  id: string;
  icon?: ReactNode;
  label: string;
  to: string;
};

const menuItems: MenuItemType[] = [
  { id: "my-profile", icon: <UserIcon />, label: "Mi Perfil", to: "asd" },
  {
    id: "my-hiring",
    icon: <PlayIcon />,
    label: "Mis solicitudes",
    to: "asd"
  },
  {
    id: "my-subscriptions",
    icon: <StarIcon />,
    label: "Mis suscripciones",
    to: "asd"
  },
  { id: "help", icon: <HelpIcon />, label: "Ayuda", to: "asd" }
];

const toMenuItem = ({ id, to, icon, label }) => (
  <NavLink to={to} className={styles.AccountDropdownItem} key={id}>
    {icon}
    <span>{label}</span>
  </NavLink>
);

function AccountDropdown() {
  return (
    <Dropdown
      buttonChildren={<AvatarIcon />}
      menuClassName={styles.AccountDropdownMenu}
    >
      {menuItems.map(toMenuItem)}
    </Dropdown>
  );
}

export { AccountDropdown };
