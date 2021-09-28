import PageContainer from "desktop-app/components/layouts/page-container";
import classes from "classnames";
import styles from "./styles.module.scss";
import { FormattedMessage } from "react-intl";
import { StarPrice } from "../../common/helpers/star-price";
import { ROOT_PATH } from "constants/paths";
import { useEffect, useState } from "react";
import { SubmitText } from "../../common/widgets/submit-button-text";
import usePromise from "lib/hooks/usePromise";
import LoadingPage from "../../layouts/loading-page";
import { registerReferralUser } from "react-app/src/state/ducks/referrals/actions";
import { errorMessages } from "lib/messages/referrals";
import { useIntl } from "lib/custom-intl";
import ErrorReport from "react-app/src/components/layouts/error-report";
import { useRouter } from "next/router";

const initialRequestError = null;
const starPrice = <StarPrice />;

type ReferralSuccessSignUpPageProps = {
  referrerCode: string;
};

function ReferralSuccessSignUpPage({
  referrerCode,
}: ReferralSuccessSignUpPageProps) {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const { handle, status } = usePromise();
  const [requestError, setRequestError] = useState(initialRequestError);
  const [isLoadingHomePage, setIsLoadingHomePage] = useState(false);

  function changeIsLoadingHomePage() {
    setIsLoadingHomePage(true);
  }

  function setTranslatedErrorMessage(error: any) {
    const errorMessage =
      formatMessage(errorMessages[error], { referrerCode }) ||
      error?.toString?.();
    setRequestError(errorMessage);
  }

  useEffect(() => {
    async function fetchRegisterReferralUser() {
      try {
        await handle(registerReferralUser(referrerCode));
      } catch (error) {
        setTranslatedErrorMessage(error);
      }
    }

    fetchRegisterReferralUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToHomeButtonStatus = isLoadingHomePage ? "loading" : "idle";

  const isLoading = status === "idle" || status === "loading";

  if (isLoading) return <LoadingPage />;

  if (status === "rejected") {
    return (
      <ErrorReport
        errorTitle={
          <FormattedMessage defaultMessage="Ha ocurrido un error validando tu enlace de referido" />
        }
        errorDescription={requestError}
        errorPath={router.asPath}
      />
    );
  }

  return (
    <PageContainer showTopBar={false} showNavbar={false} showFooter={false}>
      <main className={styles.ReferralSuccessSignUpPage}>
        <div
          className={classes(
            "container",
            styles.ReferralSuccessSignUpPageContainer
          )}
        >
          <section className={styles.ReferralSuccessSignUpContent}>
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
            <h1 className={styles.ReferralSuccessSignUpPageTitle}>
              <FormattedMessage defaultMessage="¡Felicidades!" />
              <br />
              <FormattedMessage defaultMessage="Ya formas parte de Famosos.com" />
            </h1>
            <p className={styles.ReferralSuccessSignUpPageDescription}>
              <FormattedMessage
                defaultMessage="En tu siguiente compra tienes un descuento de 5 estrellas. Cada estrella tiene el valor de {starPrice}."
                values={{ starPrice }}
              />
            </p>
            {/* 
              Anchor tag used to force reload of the page when 
              changing the route to ensure that the user data
              is fetched again. 
            */}
            <a
              onClick={changeIsLoadingHomePage}
              href={ROOT_PATH}
              className={classes(
                "btn btn-primary",
                isLoadingHomePage && "disabled",
                styles.GoToHomeButton
              )}
            >
              <SubmitText
                baseText={<FormattedMessage defaultMessage="Continuar" />}
                status={goToHomeButtonStatus}
              />
            </a>
          </section>
        </div>
      </main>
    </PageContainer>
  );
}

export { ReferralSuccessSignUpPage };
