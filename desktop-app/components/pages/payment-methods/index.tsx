import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { trackPaymentMethodsBackButtonClick } from "react-app/src/state/utils/gtm";
import { defineMessages, useIntl } from "react-intl";
import useGetContractToPayState from "lib/hooks/useGetContractToPayState";
import dynamic from "next/dynamic";

const PaymentMethodsLayoutA = dynamic<any>(() =>
  import("../../payments-methods/payment-methods-layout-a").then(
    (mod) => mod.PaymentMethodsLayoutA
  )
);

const PaymentMethodsLayoutB = dynamic<any>(() =>
  import("../../payments-methods/payment-methods-layout-b").then(
    (mod) => mod.PaymentMethodsLayoutB
  )
);

const messages = defineMessages({
  pageHeadingTitle: {
    defaultMessage: "Confirmación de compra",
  },
});

function PaymentMethodLayout({ layoutProps, checkoutVersion = "A" }) {
  if (checkoutVersion === "B") {
    return <PaymentMethodsLayoutB {...layoutProps} />;
  }
  return <PaymentMethodsLayoutA {...layoutProps} />;
}

type PaymentMethodsProps = {};

function PaymentMethodsPage(props: PaymentMethodsProps) {
  const { formatMessage } = useIntl();
  const pageHeadingTitle = formatMessage(messages.pageHeadingTitle);
  const { contractToPay: contract, status } = useGetContractToPayState();
  const isLoading = status === "loading";
  const isCompleted = status === "completed";

  const layoutProps = {
    isCompleted,
    isLoading,
    contract,
    checkoutVersion: "A",
  };

  return (
    <PageContainer showFooter={false} showSearch={false} showBotMakerFrame>
      <PageHeading
        showHomeLink={false}
        onBackButtonClick={trackPaymentMethodsBackButtonClick}
      >
        {pageHeadingTitle}
      </PageHeading>
      <PaymentMethodLayout layoutProps={layoutProps} />
    </PageContainer>
  );
}

export { PaymentMethodsPage };
