import React from "react";
import { PageContainer } from "../../layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { UpdatePasswordFom } from "../../containers/update-password";

function UpdatePassword() {
  return (
    <PageContainer showSearch={false}>
      <main className={classes("container", styles.Container)}>
        <div>
          <h1 className={styles.Title}>
            <FormattedMessage
              defaultMessage="Nueva contraseña
"
            />
          </h1>
          <UpdatePasswordFom />
        </div>
      </main>
    </PageContainer>
  );
}

export { UpdatePassword };
