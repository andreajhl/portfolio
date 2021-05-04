import { Dropdown } from "../../common/button/dropdown";
import {
  AvatarIcon,
  HelpIcon,
  PlayIcon,
  StarIcon,
  UserIcon,
} from "desktop-app/components/common/icons";
import { ReactNode } from "react";
import { NavLink } from "desktop-app/components/common/routing/nav-link";
import styles from "./styles.module.scss";
import {
  CLIENT_HIRINGS,
  CLIENT_PROFILE,
  FEED_SUBSCRIPTION,
  FAQS_PATH,
} from "constants/paths";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "react-app/src/components/containers/login-button/login-button";
import { ProfilePicture } from "react-app/src/components/layouts/profile-picture";
import Maybe from "desktop-app/components/common/helpers/maybe";

type MenuItemType = {
  id: string;
  icon?: ReactNode;
  label: string;
  to: string;
};

const menuItems: MenuItemType[] = [
  {
    id: "my-profile",
    icon: <UserIcon />,
    label: "Mi Perfil",
    to: CLIENT_PROFILE,
  },
  {
    id: "my-hiring",
    icon: <PlayIcon />,
    label: "Mis solicitudes",
    to: CLIENT_HIRINGS,
  },
  {
    id: "my-subscriptions",
    icon: <StarIcon />,
    label: "Mis suscripciones",
    to: FEED_SUBSCRIPTION,
  },
  { id: "help", icon: <HelpIcon />, label: "Ayuda", to: FAQS_PATH },
];

const toMenuItem = ({ id, to, icon, label }) => (
  <NavLink to={to} className={styles.AccountDropdownItem} key={id}>
    {icon}
    <span>{label}</span>
  </NavLink>
);

function AccountDropdown() {
  const { isAuthenticated, user } = useAuth0();

  const userAvatar = user?.picture;

  return (
    <Maybe
      it={isAuthenticated}
      orElse={<LoginButton className={styles.AccountDropdownLoginButton} />}
    >
      <Dropdown
        buttonChildren={
          <Maybe it={userAvatar !== ""} orElse={<AvatarIcon />}>
            <ProfilePicture avatar={userAvatar} width={34} />
          </Maybe>
        }
        buttonClassName="p-0"
        menuClassName={styles.AccountDropdownMenu}
      >
        {menuItems.map(toMenuItem)}
      </Dropdown>
    </Maybe>
  );
}

export { AccountDropdown };
