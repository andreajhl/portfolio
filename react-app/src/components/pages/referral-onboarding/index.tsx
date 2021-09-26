import PageContainer from "desktop-app/components/layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { StarPrice } from "../../common/helpers/star-price";
import { Link } from "../../common/routing/link";
import { SIGN_UP_PATH } from "constants/paths";
import { REFERRER_CODE_QUERY_PARAM } from "constants/keys";

const starPrice = <StarPrice />;

type ReferralOnboardingPageProps = {
  referrerName: string;
  referrerCode: string;
};

function ReferralOnboardingPage({
  referrerName,
  referrerCode,
}: ReferralOnboardingPageProps) {
  const signUpPath = {
    pathname: SIGN_UP_PATH,
    query: { [REFERRER_CODE_QUERY_PARAM]: referrerCode },
  };

  return (
    <PageContainer showSearch={false}>
      <main className={styles.ReferralOnboardingPage}>
        <div
          className={classes(
            "container",
            styles.ReferralOnboardingPageContainer
          )}
        >
          <section className={styles.ReferralsOnboardingContent}>
            <img
              width="125"
              height="25"
              src="/assets/img/famosos-logo.svg"
              alt="Famosos Inc. Logo"
            />
            <img
              className={styles.PlaneIcon}
              width="28"
              height="25"
              src="/assets/img/paper-plane-pink-filled.svg"
              alt="Famosos Inc. Logo"
            />
            <h1 className={styles.ReferralOnboardingPageTitle}>
              <FormattedMessage
                defaultMessage="{referrerName} te ha invitado a Famosos"
                values={{ referrerName }}
              />
            </h1>
            <p className={styles.ReferralOnboardingPageDescription}>
              <FormattedMessage
                defaultMessage="Registrate y empieza a referir a tus amigos para acumular estrellas y usarlas a tu disposición. Cada estrella tiene el valor de {starPrice}."
                values={{ starPrice }}
              />
            </p>
            <Link
              href={signUpPath}
              className={classes("btn btn-primary", styles.GoToSignUpButton)}
            >
              <FormattedMessage defaultMessage="Registrarse ahora" />
            </Link>
          </section>
        </div>
      </main>
    </PageContainer>
  );
}

export { ReferralOnboardingPage };
