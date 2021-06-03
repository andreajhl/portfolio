import { SignUpBox } from "../../containers/sign-up-box";
import { PageContainer } from "../../layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { AuthBenefitsBanner } from "../../layouts/auth-benefits-banner";
import { FormattedMessage } from "react-intl";

const br = <br />;

function SignUpPage() {
  return (
    <PageContainer showSearch={false}>
      <main className={classes("container", styles.Container)}>
        <div>
          <h1 className={styles.TitleDesktop}>
            <FormattedMessage
              defaultMessage="¡Bienvenido a Famosos! {br} Crea una cuenta para empezar a
            conectar con tus famosos favoritos."
              values={{ br }}
            />
          </h1>
          <h1 className={styles.TitleMobile}>
            <FormattedMessage defaultMessage="Crea una cuenta para poder conectar con los famosos." />
          </h1>
          <AuthBenefitsBanner className={styles.AuthBenefitsBannerMobile} />
          <SignUpBox className={styles.SignUpBox} />
        </div>
        <div className={styles.AuthBenefitsBannerWrapper}>
          <AuthBenefitsBanner className={styles.AuthBenefitsBanner} />
        </div>
      </main>
    </PageContainer>
  );
}

export { SignUpPage };
