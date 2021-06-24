import { AVAILABLE_LANGS } from "constants/langs";
import { SubmitStatus } from "desktop-app/components/common/submit-status";
import useStatus from "lib/hooks/useStatus";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { updateNotificationsLang } from "react-app/src/state/ducks/session/actions";
import Skeleton from "react-loading-skeleton";
import { connect } from "react-redux";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => state;

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type NotificationLangFormProps = StateProps & DispatchProps;
// TODO: conectar con endpoint creado en branch master
function NotificationLangForm(props: NotificationLangFormProps) {
  const [status, setStatus] = useStatus();
  const { locale, push, pathname, query, asPath } = useRouter();
  const updateLang = async (lang) => {
    setStatus("loading");
    updateNotificationsLang({ lang: lang })
      .then((result) => {
        setStatus("completed");
        push({ pathname, query }, asPath, { locale: lang });
      })
      .catch((err) => {
        setStatus("rejected");
      });
  };
  return (
    <div className={styles.NotificationSlangFormContainer}>
      <label htmlFor="notifications_slang_select">
        Idioma de la página <br></br> y notificaciones
      </label>
      <select
        onChange={(event) => updateLang(event.target.value)}
        className={styles.NotificationsSlangFormSelect}
        name="notifications_slang"
        id="notifications_slang_select"
      >
        {AVAILABLE_LANGS[locale]?.map((option) => (
          <option
            value={option.lang}
            selected={
              String(locale).toLocaleLowerCase() ===
              String(option.lang).toLocaleLowerCase()
            }
          >
            {option.name}
          </option>
        ))}
      </select>
      <SubmitStatus status={"loading"} />
    </div>
  );
}

const _NotificationLangForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationLangForm);

export { _NotificationLangForm as NotificationLangForm };
