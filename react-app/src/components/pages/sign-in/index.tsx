import { PageContainer } from "../../layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { SignInBox } from "../../containers/sign-in-box";

function SignInPage() {
  return (
    <PageContainer showSearch={false}>
      <main className={classes("container", styles.Container)}>
        <div>
          <h1 className={styles.Title}>
            <FormattedMessage defaultMessage="Ingresa a tu cuenta para poder conectar con los famosos" />
          </h1>
          <SignInBox className={styles.SignInBox} />
        </div>
      </main>
    </PageContainer>
  );
}

export { SignInPage };
