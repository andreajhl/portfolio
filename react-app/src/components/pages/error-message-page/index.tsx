import PageContainer from "desktop-app/components/layouts/page-container";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import Maybe from "../../common/helpers/maybe";
import styles from "./styles.module.scss";
import classes from "classnames";
import { Link } from "../../common/routing/link";
import { ROOT_PATH } from "constants/paths";

type ErrorMessagePageProps = {
  title: ReactNode;
  description?: ReactNode;
  showPath?: boolean;
  showRetryButton?: boolean;
  showGoHomeButton?: boolean;
};

function ErrorMessagePage({
  title,
  description,
  showPath = true,
  showRetryButton = true,
  showGoHomeButton = true,
}: ErrorMessagePageProps) {
  const path = useRouter().asPath;

  function reloadPage() {
    window?.location?.reload?.();
  }

  return (
    <PageContainer showSearch={false}>
      <main className={styles.ErrorMessagePage}>
        <div className={classes("container", styles.ErrorMessagePageContainer)}>
          <h1 className={styles.ErrorMessagePageTitle}>{title}</h1>
          <Maybe it={Boolean(description)}>
            <p className={styles.ErrorMessagePageDescription}>{description}</p>
          </Maybe>
          <Maybe it={Boolean(showPath)}>
            <p className={styles.ErrorMessagePagePath}>
              <FormattedMessage
                defaultMessage="Ruta: {path}"
                values={{ path }}
              />
            </p>
          </Maybe>
          <div className={styles.ErrorMessagePageButtonsWrapper}>
            <Maybe it={showRetryButton}>
              <button
                type="button"
                className={classes(
                  "btn btn-primary",
                  styles.ErrorMessagePageButton
                )}
                onClick={reloadPage}
              >
                <FormattedMessage defaultMessage="Reintentar" />
              </button>
            </Maybe>
            <Maybe it={showGoHomeButton}>
              <Link
                href={ROOT_PATH}
                className={classes(
                  "btn btn-primary",
                  styles.ErrorMessagePageButton
                )}
              >
                <FormattedMessage defaultMessage="Inicio" />
              </Link>
            </Maybe>
          </div>
          <img
            className={styles.ErrorMessagePageIllustration}
            width="231"
            height="134"
            src="/assets/img/error-message-page-illustration.png"
            alt="Error Message"
          />
        </div>
      </main>
    </PageContainer>
  );
}

export { ErrorMessagePage };
