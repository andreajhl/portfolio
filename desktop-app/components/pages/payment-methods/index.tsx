import { ContractInfo } from "desktop-app/components/payments-methods/contract-info";
import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { connect, ConnectedProps } from "react-redux";
import styles from "./styles.module.scss";
import { PaymentsMethodsSelectorCard } from "desktop-app/components/payments-methods/payments-methods-selector-card";
import { PaymentMethodsSelectorCardSkeleton } from "desktop-app/components/payments-methods/payments-methods-selector-card/skeleton";
import { WhatHappensBeforeBanner } from "desktop-app/components/payments-methods/what-happens-before-banner";
import { paymentsOperations } from "react-app/src/state/ducks/payments";
import { RootState } from "react-app/src/state/store";
import { useEffect } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";
import { ContractInfoSkeleton } from "desktop-app/components/payments-methods/contract-info/skeleton";
import { analytics } from "react-app/src/state/utils/gtm";
import getWindow from "react-app/src/utils/getWindow";
import { useRouter } from "next/router";
import { defineMessages, useIntl } from "react-intl";
import { getPurchaseSummaryPath } from "constants/paths";

const messages = defineMessages({
  pageHeadingTitle: {
    defaultMessage: "Confirmación de compra",
  },
});

function trackLeave(newRoute: string) {
  if (newRoute.includes(getPurchaseSummaryPath())) return;
  analytics.track("PAYMENT_METHODS_LEAVE", {
    newRoute,
    isBackButton: false,
    widget: "PaymentMethodsPage",
    path: getWindow().location.pathname,
  });
}

function trackBackButtonClick() {
  analytics.track("PAYMENT_METHODS_LEAVE", {
    isBackButton: true,
    widget: "PaymentMethodsPage",
    path: getWindow().location.pathname,
  });
}

const mapStateToProps = (state: RootState) => ({
  isLoading: state.payments.getContractToPayReducer.loading,
  isCompleted: state.payments.getContractToPayReducer.completed,
  contract: state.payments.getContractToPayReducer.data,
});

const mapDispatchToProps = {
  getContractToPayData: paymentsOperations.getContractToPayV2,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PaymentMethodsProps = { contractReference: string } & PropsFromRedux;

function PaymentMethodsPage({
  contractReference,
  isLoading,
  isCompleted,
  contract,
  getContractToPayData,
}: PaymentMethodsProps) {
  const router = useRouter();
  const { formatMessage } = useIntl();

  useEffect(() => {
    getContractToPayData(contractReference);
  }, [contractReference]);

  useEffect(() => {
    router.events.on("routeChangeStart", trackLeave);
    return () => router.events.off("routeChangeStart", trackLeave);
  }, [router.events]);

  const pageHeadingTitle = formatMessage(messages.pageHeadingTitle);

  return (
    <PageContainer showFooter={false} showSearch={false} showBotMakerFrame>
      <PageHeading
        showHomeLink={false}
        onBackButtonClick={trackBackButtonClick}
        children={pageHeadingTitle}
      />
      <div className={`container ${styles.PaymentMethodsPageContent}`}>
        <div className={styles.PaymentMethodsPurchaseForm}>
          <Maybe
            it={isCompleted && !isLoading}
            orElse={<ContractInfoSkeleton />}
          >
            <ContractInfo
              contract_reference={contract.reference}
              celebrityAvatar={contract.celebrity_avatar}
              celebrityFullName={contract.celebrity_full_name}
              occasion={contract.occasion}
              deliveryTo={contract.delivery_to}
              deliveryFrom={contract.delivery_from}
              instructions={contract.instructions}
              price={contract.price}
              original_price={contract.original_price}
              celebrityDiscountPercentage={contract.discount_percentage}
              priceBeforeCelebrityDiscount={contract.original_price}
            />
          </Maybe>
          <Maybe
            it={isCompleted && !isLoading}
            orElse={<PaymentMethodsSelectorCardSkeleton />}
          >
            <PaymentsMethodsSelectorCard
              contractPrice={contract.price}
              contractReference={contract.reference}
              celebrityId={contract.celebrity_id}
            />
          </Maybe>
        </div>
        <WhatHappensBeforeBanner
          className={styles.WhatHappensBeforeBannerModifier}
          direction={"column"}
        />
      </div>
    </PageContainer>
  );
}

const _PaymentMethodsPage = connector(PaymentMethodsPage);

export default PaymentMethodsPage;

export { _PaymentMethodsPage as PaymentMethodsPage };
