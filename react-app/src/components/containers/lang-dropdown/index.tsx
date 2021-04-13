import React from "react";
import { GlobeEarth } from "../../common/icons";
import styles from "./styles.module.scss";
import { Dropdown } from "../../common/button/dropdown";
import { AVAILABLE_LANGS } from "constants/langs";
import { useRouter } from "next/router";
import classes from "classnames";
type localeAvailables = "es" | "en" | "pt";

export default function LangDropdown() {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;
  const handleChangeLang = (lang: string) => {
    router.push({ pathname, query }, asPath, { locale: lang });
  };
  return (
    <Dropdown
      buttonChildren={<GlobeEarth />}
      buttonClassName="p-0"
      menuClassName={styles.CurrencyDropdownMenu}
      showClassName={styles.CurrencyDropdownMenuShow}
    >
      {AVAILABLE_LANGS[locale as localeAvailables].map((lang) => (
        <div
          onClick={() => handleChangeLang(lang.lang)}
          className={classes(
            styles.CurrencyDropdownItem,
            locale === lang.lang ? styles.CurrencyDropdownItemActive : null
          )}
        >
          <span>{lang.name}</span>
        </div>
      ))}
    </Dropdown>
  );
}
