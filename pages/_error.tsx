import { FormattedMessage } from "react-intl";
import NextErrorComponent from "next/error";
import * as Sentry from "@sentry/nextjs";
import { NextPage, NextPageContext } from "next";
import debug from "react-app/src/utils/debug";
import ErrorReport from "react-app/src/components/layouts/error-report";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { setCookie } from "lib/setCookie";
import { NUMBER_OF_RELOAD_REALIZED } from "constants/keys";
import getCookie from "react-app/src/utils/getCookie";
import ReloadingPath from "react-app/src/components/containers/reloading-path";

type ErrorPageProps = {
  err?: unknown;
  hasGetInitialPropsRun?: boolean;
  asPath?: string;
  statusCode: number;
};
const TEEN_SECONDS_IN_MILLISECONDS = 10000;

const CustomError: NextPage<ErrorPageProps> = ({
  err,
  hasGetInitialPropsRun,
  statusCode,
  asPath,
}) => {
  const { push } = useRouter();
  useEffect(() => {
    let IDClear;
    const numberOfRetryRealizedInSession = Number(
      getCookie(NUMBER_OF_RELOAD_REALIZED)
    );
    setCookie(
      NUMBER_OF_RELOAD_REALIZED,
      String(
        numberOfRetryRealizedInSession ? numberOfRetryRealizedInSession + 1 : 1
      ),
      1
    );
    if (numberOfRetryRealizedInSession < 5) {
      IDClear = setTimeout(() => {
        push(asPath);
      }, TEEN_SECONDS_IN_MILLISECONDS);
    }
    return () => {
      clearTimeout(IDClear);
    };
  }, []);

  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
    // Flushing is not required in this case as it only happens on the client
  }
  return (
    <ErrorReport
      errorTitle={<FormattedMessage defaultMessage="Ha ocurrido un error." />}
      errorDescription={
        <>
          <p
            className="h6"
            style={{
              color: "white",
            }}
          >
            <FormattedMessage defaultMessage="Estamos haciendo lo posible por resolverlo." />
          </p>
          <ReloadingPath
            path={asPath}
            renderText={(secondsCounter) => (
              <span
                style={{
                  color: "white",
                  fontSize: "0.8rem",
                }}
              >
                Intentando nuevamente en {secondsCounter} segundos
              </span>
            )}
          />
          {statusCode ? (
            <p
              className="font-weight-light text-center"
              style={{
                color: "white",
              }}
            >
              CODE {String(statusCode)}
            </p>
          ) : null}
        </>
      }
      errorPath={
        asPath ? (
          <h3>
            <span>{String(asPath)}</span>
          </h3>
        ) : null
      }
    />
  );
};

CustomError.getInitialProps = async ({ res, err, asPath }: NextPageContext) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
  } as NextPageContext);

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  (errorInitialProps as ErrorPageProps).hasGetInitialPropsRun = true;

  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary. Read more about what types of exceptions are caught by Error
  //    Boundaries: https://reactjs.org/docs/error-boundaries.html

  if (res?.statusCode === 404) {
    // Opinionated: do not record an exception in Sentry for 404
    return { statusCode: 404 };
  }

  (errorInitialProps as ErrorPageProps).asPath = asPath;

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);

    return errorInitialProps;
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );
  try {
    await Sentry.flush(2000);
  } catch (error) {
    debug("Sentry.flush failed to be called:", error);
  }

  return errorInitialProps;
};
export default CustomError;
