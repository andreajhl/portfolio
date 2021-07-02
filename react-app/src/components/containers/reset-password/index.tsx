import React, { useState } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import classes from "classnames";
import { AuthFormField } from "../../layouts/auth-form-field";
import { useRouter } from "next/router";
import { CHANGE_PASSWORD_PATH } from "../../../routing/Paths";

function ResetPassword() {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [isEmailSend, setIsEmailSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value.trim().toLocaleLowerCase());
  };
  const handleSecurityCodeInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecurityCode(event.target.value);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendData();
    }
  };

  const generateSecurityCode = async () => {
    await axios
      .post("/api/generate-security-code", {
        email: email.trim().toLocaleLowerCase()
      })
      .then((response) => {
        setIsEmailSend(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.response.data.error);
      });
  };
  const validateSecurityCode = async () => {
    await axios
      .post("/api/validate-security-code", {
        email: email.trim().toLocaleLowerCase(),
        securityCode: securityCode.trim().toLocaleLowerCase()
      })
      .then((response) => {
        push(CHANGE_PASSWORD_PATH);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };
  const sendData = async () => {
    setIsLoading(true);
    setError(null);
    if (!isEmailSend && !isLoading) {
      generateSecurityCode();
    } else if (!isLoading) {
      validateSecurityCode();
    }
  };

  if (!isEmailSend) {
    return (
      <div className={styles.ResetPasswordWrapper}>
        <p className={styles.SubTitle}>
          <FormattedMessage defaultMessage="Indicanos tu correo electrónico y podrás restablecer tu contraseña." />
        </p>
        <AuthFormField
          label="Correo electrónico"
          placeholder="usuario@dominio.com"
          value={email}
          onChange={handleEmailInput}
          onKeyPress={handleKeyPress}
        />
        {error && <span className={styles.ErrorMessage}>{error}</span>}
        <button
          type="button"
          className={classes("btn btn-primary", styles.SignInBoxSubmitButton)}
          disabled={isLoading}
          onClick={sendData}
        >
          <FormattedMessage defaultMessage={"Continuar"} />
        </button>
      </div>
    );
  }
  return (
    <div className={styles.ResetPasswordWrapper}>
      <p className={styles.SubTitle}>
        <FormattedMessage
          defaultMessage="Revisa tu correo electrónico e ingresa el código de 6 dígitos que has recibido
"
        />
      </p>
      <AuthFormField
        label="Código de seguridad"
        placeholder="123456"
        value={securityCode}
        type="number"
        onChange={handleSecurityCodeInputChange}
        onKeyPress={handleKeyPress}
      />
      {error && <span className={styles.ErrorMessage}>{error}</span>}
      <button
        type="button"
        className={classes("btn btn-primary", styles.SignInBoxSubmitButton)}
        disabled={isLoading}
        onClick={sendData}
      >
        <FormattedMessage defaultMessage={"Continuar"} />
      </button>
    </div>
  );
}

export { ResetPassword };
