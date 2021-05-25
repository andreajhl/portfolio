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

const mapStateToProps = (state: RootState) => ({
  isLoading: state.payments.getContractToPayReducer.loading,
  isCompleted: state.payments.getContractToPayReducer.completed,
  contract: state.payments.getContractToPayReducer.data,
});

const mapDispatchToProps = {
  getContractToPayData: paymentsOperations.getContractToPay,
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
  useEffect(() => {
    getContractToPayData(contractReference);
  }, [contractReference]);
  console.log(contract);
  return (
    <PageContainer showFooter={false}>
      <PageHeading showHomeLink={false}>Confirmación de compra</PageHeading>

      <div className={`container ${styles.PaymentMethodsPageContent}`}>
        <div className={styles.PaymentMethodsPageContentLeftSide}>
          <Maybe
            it={isCompleted && !isLoading}
            orElse={<ContractInfoSkeleton />}
          >
            <ContractInfo
              celebrityAvatar={contract.celebrity_avatar}
              celebrityFullName={contract.celebrity_full_name}
              occasion={"BIRTHDAY"}
              deliveryTo={contract.delivery_to}
              deliveryFrom={contract.delivery_from}
              instructions={contract.instructions}
              price={contract.price}
              original_price={contract.original_price}
              celebrityDiscountPercentage={contract.discount_percentage}
              priceBeforeCelebrityDiscount={contract.original_price}
            />
          </Maybe>
        </div>
        <div className={styles.PaymentMethodsPageContentRightSide}>
          <Maybe
            it={isCompleted && !isLoading}
            orElse={<PaymentMethodsSelectorCardSkeleton />}
          >
            <PaymentsMethodsSelectorCard
              contractPrice={contract.price}
              contractReference={contract.reference}
            />
          </Maybe>
        </div>
      </div>
      <WhatHappensBeforeBanner />
    </PageContainer>
  );
}

const _PaymentMethodsPage = connector(PaymentMethodsPage);

export { _PaymentMethodsPage as PaymentMethodsPage };
