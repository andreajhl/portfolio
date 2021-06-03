import { PageContainer } from "../../layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { SignUpBox } from "../../containers/sign-up-box";
import { AuthPreHiringSteps } from "../../layouts/auth-pre-hiring-steps";
import React from "react";
import { AuthBenefitsBanner } from "../../layouts/auth-benefits-banner";

const AuthFirstStep = <FormattedMessage defaultMessage="Registro" />;

type SignUpFromPageProps = {
  query: { [key: string]: string };
};

function SignUpFromPage({ query }: SignUpFromPageProps) {
  return (
    <PageContainer showSearch={false}>
      <main className={classes("container", styles.Container)}>
        <div className={styles.LeftSide}>
          <AuthPreHiringSteps
            firstStep={AuthFirstStep}
            className={styles.AuthSteps}
            celebrityFullName={query.celebrity}
          />
          <h1 className={styles.Title}>
            <FormattedMessage defaultMessage="Crea una cuenta para poder conectar con los famosos" />
          </h1>
          <AuthBenefitsBanner className={styles.AuthBenefitsBanner} />
        </div>
        <div className={styles.RightSide}>
          <AuthPreHiringSteps
            firstStep={AuthFirstStep}
            className={styles.AuthStepsMobile}
            celebrityFullName={query.celebrity}
          />
          <h1 className={styles.TitleMobile}>
            <FormattedMessage defaultMessage="Crea una cuenta para poder conectar con los famosos" />
          </h1>
          <AuthBenefitsBanner className={styles.AuthBenefitsBannerMobile} />
          <SignUpBox className={styles.SignUpBox} willRedirect />
        </div>
      </main>
    </PageContainer>
  );
}

export { SignUpFromPage };
