import React from "react";
import { PageContainer } from "../../layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { ResetPassword } from "../../containers/reset-password";

function ForgotPassword() {
  return (
    <PageContainer showSearch={false}>
      <main className={classes("container", styles.Container)}>
        <div>
          <h1 className={styles.Title}>
            <FormattedMessage defaultMessage="Recuperar contraseña" />
          </h1>
          <ResetPassword />
        </div>
      </main>
    </PageContainer>
  );
}

export { ForgotPassword };
