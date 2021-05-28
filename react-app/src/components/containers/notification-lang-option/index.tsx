import { useRouter } from "next/router";
import React, { useState } from "react";
import { updateNotificationsLang } from "react-app/src/state/ducks/session/actions";
import { Form } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { AVAILABLE_LANGS } from "../../../../../constants/langs";

type NotificationLangOptionsProps = {
  currentUserLang: string;
};

function NotificationLangOptions({
  currentUserLang
}: NotificationLangOptionsProps) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const updateLang = async (lang) => {
    setError(false);
    setSuccess(false);
    updateNotificationsLang({ lang: lang })
      .then((result) => {
        setSuccess(true);
        setError(false);
      })
      .catch((err) => {
        setSuccess(false);
        setError(true);
      });
  };
  const { locale } = useRouter();
  return (
    <Form>
      <Form.Group>
        <Form.Label>
          <FormattedMessage defaultMessage="Idioma de notificaciones" />
        </Form.Label>
        <Form.Control
          onChange={(event) => updateLang(event.target.value)}
          as="select"
        >
          {AVAILABLE_LANGS[locale]?.map((option) => (
            <option
              value={option.lang}
              selected={currentUserLang === option.lang}
            >
              {option.name}
            </option>
          ))}
        </Form.Control>
        {success ? (
          <span className="text-success">
            <FormattedMessage defaultMessage="Idioma de notificaciones cambiado con éxito" />
          </span>
        ) : null}
        {error ? (
          <span className="text-danger">
            <FormattedMessage defaultMessage="No se pudo guardar tu cambio. Intenta de nuevo." />
          </span>
        ) : null}
      </Form.Group>
    </Form>
  );
}

export default NotificationLangOptions;
