import React, { useState } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import styles from "./styles.module.scss";
import classes from "classnames";
import { AuthFormField } from "../../layouts/auth-form-field";
import { useRouter } from "next/router";

function UpdatePasswordFom() {
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirm_password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { push } = useRouter();
  const [isUpdated, setIsUpdated] = useState(false);

  const handleNewPasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewPassword((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateEqualPassword = () => {
    const areEqual = newPassword.confirm_password === newPassword.password;
    if (!areEqual) {
      setError("Las contraseñas no son iguales");
      return false;
    } else {
      return true;
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendData();
    }
  };

  const validateSecurityCode = async () => {
    await axios
      .post("/api/update-password", {
        newPassword: newPassword.password.trim().toLocaleLowerCase()
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
    setError(null);
    if (!isLoading && validateEqualPassword()) {
      setIsLoading(true);
      validateSecurityCode();
    }
  };
  const toggleShowPasswordState = () => {
    setShowPassword((prevState) => !prevState);
  };
  if (!isUpdated) {
    return (
      <div className={styles.ResetPasswordWrapper}>
        <p className={styles.SubTitle}>
          <FormattedMessage defaultMessage="Para continuar crea una nueva contraseña para tu cuenta." />
        </p>
        <p>
          <FormattedMessage defaultMessage="Asegúrate de que sea una contraseña fácil de recordar." />
        </p>
        <AuthFormField
          label="Nueva Contraseña"
          type={showPassword ? "text" : "password"}
          value={newPassword.password}
          name="password"
          onChange={handleNewPasswordInputChange}
          onKeyPress={handleKeyPress}
          onIconClick={toggleShowPasswordState}
          iconElement={
            !showPassword ? (
              <i className="fas fa-eye cursor-pointer"></i>
            ) : (
              <i className="fas fa-eye-slash cursor-pointer"></i>
            )
          }
        />
        <AuthFormField
          label="Confirmar nueva Contraseña"
          name="confirm_password"
          type={showPassword ? "text" : "password"}
          value={newPassword.confirm_password}
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
      <p
        style={{
          textAlign: "center"
        }}
        className={styles.SubTitle}
      >
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
