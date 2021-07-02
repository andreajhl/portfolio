import React, { useState } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import classes from "classnames";
import { AuthFormField } from "../../layouts/auth-form-field";
import { useRouter } from "next/router";

function UpdatePasswordFom() {
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { push } = useRouter();
  const [isUpdated, setIsUpdated] = useState(false);

  const handleNewPasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(event.target.value);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendData();
    }
  };

  const validateSecurityCode = async () => {
    await axios
      .post("/api/update-password", {
        newPassword: newPassword.trim().toLocaleLowerCase()
      })
      .then((response) => {
        setIsUpdated(true);
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

    validateSecurityCode();
  };

  if (!isUpdated) {
    return (
      <div className={styles.ResetPasswordWrapper}>
        <p className={styles.SubTitle}>
          <FormattedMessage
            defaultMessage="Por favor ingresa tus nuevos credenciales
  "
          />
        </p>
        <AuthFormField
          label="Nueva Contraseña"
          type="password"
          // placeholder=""
          value={newPassword}
          onChange={handleNewPasswordInputChange}
          onKeyPress={handleKeyPress}
        />
        {error && <span className={styles.ErrorMessage}>{error}</span>}
        <button
          type="button"
          className={classes("btn btn-primary", styles.SignInBoxSubmitButton)}
          disabled={isLoading}
          onClick={sendData}
        >
          <FormattedMessage defaultMessage={"Enviar"} />
        </button>
      </div>
    );
  }
  return (
    <div className={styles.ResetPasswordWrapper}>
      <p className={styles.SubTitle}>
        <FormattedMessage
          defaultMessage="Contraseña actualizada
"
        />
      </p>
      <div className={styles.UpdateCompleteBox}>
        <i className={`far fa-check-circle ${styles.checkIcon}`}></i>
        <button
          type="button"
          className={classes("btn btn-primary", styles.SignInBoxSubmitButton)}
          disabled={isLoading}
          onClick={() => push("/")}
        >
          <FormattedMessage defaultMessage={"Ir al Inicio"} />
        </button>
      </div>
    </div>
  );
}

export { UpdatePasswordFom };
