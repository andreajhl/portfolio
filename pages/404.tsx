// export { FourZeroFour as default } from "react-app/src/components/pages/404";

import { useRouter } from "next/router";
import React from "react";
import ErrorReport from "react-app/src/components/layouts/error-report";
import { FormattedMessage } from "react-intl";

function ServerErrorPage() {
  const { asPath } = useRouter();
  return (
    <ErrorReport
      errorTitle={
        <FormattedMessage defaultMessage="Lo sentimos, esta página no fue encontrada" />
      }
      errorPath={asPath}
    />
  );
}

export default ServerErrorPage;
