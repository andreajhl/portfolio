import { PageContainer } from "../../layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { SignInBox } from "../../containers/sign-in-box";
import { AuthPreHiringSteps } from "../../layouts/auth-pre-hiring-steps";
import { CELEBRITY_NAME_QUERY_PARAM } from "constants/keys";

type SignInFromPageProps = {
  query: { [key: string]: string };
};

function SignInFromPage({ query }: SignInFromPageProps) {
  return (
    <PageContainer showSearch={false}>
      <main className={classes("container", styles.Container)}>
        <div>
          <AuthPreHiringSteps
            className={styles.AuthStepsMobile}
            celebrityFullName={query[CELEBRITY_NAME_QUERY_PARAM]}
          />
          <h1 className={styles.Title}>
            <FormattedMessage defaultMessage="Ingresa a tu cuenta para poder conectar con los famosos" />
          </h1>
          <SignInBox className={styles.SignInBox} willRedirect />
        </div>
        <div className={styles.AuthStepsWrapper}>
          <AuthPreHiringSteps
            className={styles.AuthSteps}
            celebrityFullName={query.celebrity}
          />
        </div>
      </main>
    </PageContainer>
  );
}

export { SignInFromPage };
