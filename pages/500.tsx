import { useRouter } from "next/router";
import React from "react";
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
        </>
      }
      errorPath={asPath}
    />
  );
}

export default ServerErrorPage;
