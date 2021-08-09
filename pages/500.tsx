import { useRouter } from "next/router";
import React from "react";
import ReloadingPath from "react-app/src/components/containers/reloading-path";
import ErrorReport from "react-app/src/components/layouts/error-report";
import { FormattedMessage } from "react-intl";

function ServerErrorPage() {
  const { asPath } = useRouter();

  return (
    <ErrorReport
      errorTitle="Ha ocurrido un error."
      errorDescription={
        <>
          <FormattedMessage defaultMessage="Nos disculpamos, estamos arreglando el problema." />
          <br />
          <ReloadingPath
            path={asPath}
            renderText={(secondsCounter) => (
              <span
                style={{
                  color: "white",
                  fontSize: "0.8rem"
                }}
              >
                <FormattedMessage
                  defaultMessage="Intentando nuevamente en {secondsCounter} segundos"
                  values={{ secondsCounter }}
                />
              </span>
            )}
          />
        </>
      }
      errorPath={asPath}
    />
  );
}

export default ServerErrorPage;
