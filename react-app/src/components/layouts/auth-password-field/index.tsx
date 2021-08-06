import React, { useState } from "react";
import { AuthFormField, AuthFormFieldProps } from "../auth-form-field";

export type AuthPasswordFieldProps = Omit<
  AuthFormFieldProps,
  "type" | "onIconClick" | "iconElement"
>;

export function AuthPasswordField(props: AuthPasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPasswordState() {
    setShowPassword((previousShowPassword) => !previousShowPassword);
  }

  const iconElement = showPassword ? (
    <i className="fas fa-eye-slash cursor-pointer" />
  ) : (
    <i className="fas fa-eye cursor-pointer" />
  );

  return (
    <AuthFormField
      type={showPassword ? "text" : "password"}
      onIconClick={toggleShowPasswordState}
      iconElement={iconElement}
      {...props}
    />
  );
}
