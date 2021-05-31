import React from "react";
import { GlobeEarth } from "../../common/icons";
import styles from "./styles.module.scss";
import { AVAILABLE_LANGS } from "constants/langs";
import { useRouter } from "next/router";
import classes from "classnames";
import Popup from "reactjs-popup";
import { updateNotificationsLang } from "react-app/src/state/ducks/session/actions";
import { useAuth0 } from "@auth0/auth0-react";
// import { parse, serialize } from "cookie";
type localeAvailables = "es" | "en" | "pt";
const ONE_YEAR_IN_MILLISECONDS = 365 * 24 * 3600 * 1000;

export default function LangDropdown() {
  const router = useRouter();
  const { isAuthenticated } = useAuth0();
  const { locale, pathname, query, asPath } = router;

  const handleChangeLang = async (lang: string) => {
    const date = new Date();
    date.setTime(date.getTime() + ONE_YEAR_IN_MILLISECONDS);
    if (isAuthenticated) await updateNotificationsLang({ lang: lang });
    const expiresTime = "expires=" + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${lang};${expiresTime}`;
    router.push({ pathname, query }, asPath, { locale: lang });
  };

  return (
    <Popup
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
