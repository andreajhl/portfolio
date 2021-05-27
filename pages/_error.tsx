import { NavLink } from "react-app/src/components/common/routing";
import { PageContainer } from "react-app/src/components/layouts/page-container";
import { ROOT_PATH } from "react-app/src/routing/Paths";
import NextErrorComponent from "next/error";
import * as Sentry from "@sentry/nextjs";
import { NextPageContext } from "next";

const CustomError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
    // Flushing is not required in this case as it only happens on the client
  }
  return (
    <PageContainer applyFetchCelebrities={false} showFooter={false}>
      <div className="SignInPage">
        <div className="section">
          <div className="auth-container mx-auto text-center p-4">
            <h3 className="font-weight-light text-center">
              Ha ocurrido un error.
            </h3>
            <p className="h6">Estamos haciendo lo posible por resolverlo.</p>
            <br />
            <img
              width="200px"
              style={{ opacity: "0.2" }}
              src="/assets/img/sad-face-in-rounded-square.svg"
              alt="sad-face"
            />
            <br />
            <br />
            <NavLink to={ROOT_PATH}>
              <button className="btn btn-primary">Volver a inicio</button>
            </NavLink>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

CustomError.getInitialProps = async ({
  res,
  err,
  asPath,
  ...props
}: NextPageContext) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
    ...props
  });

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

  if (err) {
    Sentry.captureException(err);

    // Flushing before returning is necessary if deploying to Vercel, see
    // https://vercel.com/docs/platform/limits#streaming-responses
    await Sentry.flush(2000);

    return errorInitialProps;
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );
  await Sentry.flush(2000);

  return errorInitialProps;
};
export default CustomError;
