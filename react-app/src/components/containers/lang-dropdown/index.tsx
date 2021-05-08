import React from "react";
import { GlobeEarth } from "../../common/icons";
import styles from "./styles.module.scss";
import { AVAILABLE_LANGS } from "constants/langs";
import { useRouter } from "next/router";
import classes from "classnames";
import Popup from "reactjs-popup";
// import { parse, serialize } from "cookie";
type localeAvailables = "es" | "en" | "pt";

export default function LangDropdown() {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;
  const handleChangeLang = (lang: string) => {
    document.cookie = `NEXT_LOCALE=${lang}`;
    router.push({ pathname, query }, asPath, { locale: lang });
  };

  return (
    <Popup
      on="hover"
      arrow={false}
      trigger={(props) => (
        <button className={classes("btn btn-outline", styles.ButtonDropdown)}>
          <GlobeEarth />{" "}
        </button>
      )}
      closeOnDocumentClick
    >
      <div className={styles.CurrencyDropdownMenu}>
        {AVAILABLE_LANGS[locale as localeAvailables].map((lang) => (
          <div
            key={lang.lang}
            onClick={() => handleChangeLang(lang.lang)}
            className={classes(
              styles.CurrencyDropdownItem,
              locale === lang.lang ? styles.CurrencyDropdownItemActive : null
            )}
          >
            <span>{lang.name}</span>
          </div>
        ))}
      </div>
    </Popup>
  );
}
