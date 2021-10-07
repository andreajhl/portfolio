import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { trackPaymentMethodsBackButtonClick } from "react-app/src/state/utils/gtm";
import { defineMessages, useIntl } from "react-intl";
import useGetContractToPayState from "lib/hooks/useGetContractToPayState";
import dynamic from "next/dynamic";
import { useIsOnMobileScreen } from "lib/is-on-mobile-screen";

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
  const isMobile = useIsOnMobileScreen();

  if (!isMobile || checkoutVersion === "A") {
    return <PaymentMethodsLayoutA {...layoutProps} />;
  }
  return <PaymentMethodsLayoutB {...layoutProps} />;
}

type PaymentMethodsProps = {
  checkoutVersion?: "A" | "B";
};

function PaymentMethodsPage({ checkoutVersion }: PaymentMethodsProps) {
  const { formatMessage } = useIntl();
  const pageHeadingTitle = formatMessage(messages.pageHeadingTitle);
  const { contractToPay: contract, status } = useGetContractToPayState();
  const isLoading = status === "loading";
  const isCompleted = status === "completed";

  const layoutProps = {
    isCompleted,
    isLoading,
    contract,
  };

  return (
    <PageContainer showFooter={false} showSearch={false} showBotMakerFrame>
      <PageHeading
        showHomeLink={false}
        onBackButtonClick={trackPaymentMethodsBackButtonClick}
      >
        {pageHeadingTitle}
      </PageHeading>
      <PaymentMethodLayout
        layoutProps={layoutProps}
        checkoutVersion={checkoutVersion}
      />
    </PageContainer>
  );
}

export { PaymentMethodsPage };
