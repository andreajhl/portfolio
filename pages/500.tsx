import { NUMBER_OF_RELOAD_REALIZED } from "constants/keys";
import { setCookie } from "lib/setCookie";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ErrorReport from "react-app/src/components/layouts/error-report";
import getCookie from "react-app/src/utils/getCookie";
import { FormattedMessage } from "react-intl";
const TEEN_SECONDS_IN_MILLISECONDS = 10000;

function ServerErrorPage() {
  const { asPath, push } = useRouter();
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
  return (
    <ErrorReport
      errorTitle="Ha ocurrido un error."
      errorDescription={
        <>
          <FormattedMessage defaultMessage="Nos disculpamos, estamos arreglando el problema." />
        </>
      }
      errorPath={asPath}
    />
  );
}

export default ServerErrorPage;
