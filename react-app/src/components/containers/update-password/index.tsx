import React, { useState } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import classes from "classnames";
import { AuthFormField } from "../../layouts/auth-form-field";

function UpdatePasswordFom() {
  const [securityCode, setSecurityCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const validateSecurityCode = async () => {
    await axios
      .post("/api/validate-security-code", {
        securityCode: securityCode.trim().toLocaleLowerCase()
      })
      .then((response) => {
        console.log({ response });
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
        value={securityCode}
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
        <FormattedMessage defaultMessage={"Enviar"} />
      </button>
    </div>
  );
}

export { UpdatePasswordFom };
