import contractData from "constants/contract";
import { ContractInfo } from "desktop-app/components/payments-methods/contract-info";
import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { connect, ConnectedProps } from "react-redux";
import styles from "./styles.module.scss";
import { PaymentsMethodsSelectorCard } from "desktop-app/components/payments-methods/payments-methods-selector-card";
import { WhatHappensBeforeBanner } from "desktop-app/components/payments-methods/what-happens-before-banner";
import { paymentsOperations } from "react-app/src/state/ducks/payments";
import { RootState } from "react-app/src/state/store";
import { useEffect } from "react";
import Maybe from "desktop-app/components/common/helpers/maybe";

// mapStateToProps
const mapStateToProps = (state: RootState) => ({
  isLoading: state.payments.getContractToPayReducer.loading,
  isCompleted: state.payments.getContractToPayReducer.completed,
  contract: state.payments.getContractToPayReducer.data,
});

// mapDispatchToProps

const mapDispatchToProps = {
  getContractToPayData: paymentsOperations.getContractToPay,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type PaymentMethodsProps = { contractReference: string } & PropsFromRedux;

// type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;

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

  return (
    <PageContainer showFooter={false}>
      <PageHeading showHomeLink={false}>Confirmación de compra</PageHeading>
      <Maybe it={isCompleted && !isLoading}>
        <div className={`container ${styles.PaymentMethodsPageContent}`}>
          <div className={styles.PaymentMethodsPageContentLeftSide}>
            <ContractInfo
              celebrityAvatar={contract.celebrity_avatar}
              celebrityFullName={contract.celebrity_full_name}
              occasion={"BIRTHDAY"}
              deliveryTo={contract.delivery_to}
              deliveryFrom={contract.delivery_from}
              instructions={contract.instructions}
              price={contract.price}
              celebrityDiscountPercentage={contract.discount_percentage}
              priceBeforeCelebrityDiscount={contract.original_price}
            />
          </div>
          <div className={styles.PaymentMethodsPageContentRightSide}>
            <PaymentsMethodsSelectorCard
              contractPrice={contract.price}
              contractReference={contract.reference}
            />
          </div>
        </div>
      </Maybe>
      <WhatHappensBeforeBanner />
    </PageContainer>
  );
}

const _PaymentMethodsPage = connector(PaymentMethodsPage);

export { _PaymentMethodsPage as PaymentMethodsPage };
