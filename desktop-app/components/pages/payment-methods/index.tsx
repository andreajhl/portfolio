import contractData from "constants/contract";
import { ContractInfo } from "desktop-app/components/payments-methods/contract-info";
import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { PaymentsMethodsSelectorCard } from "desktop-app/components/payments-methods/payments-methods-selector-card";
import { WhatHappensBeforeBanner } from "desktop-app/components/payments-methods/what-happens-before-banner";

const mapStateToProps = (state) => ({ contractData });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type PaymentMethodsProps = { contractReference: string } & StateProps &
  DispatchProps;

function PaymentMethodsPage({ contractData }: PaymentMethodsProps) {
  return (
    <PageContainer showFooter={false}>
      <PageHeading showHomeLink={false}>Confirmación de compra</PageHeading>
      <div className={`container ${styles.PaymentMethodsPageContent}`}>
        <div className={styles.PaymentMethodsPageContentLeftSide}>
          <ContractInfo
            celebrityAvatar={contractData.celebrity_avatar}
            celebrityFullName={contractData.celebrity_full_name}
            occasion={"BIRTHDAY"}
            deliveryTo={contractData.delivery_to}
            deliveryFrom={contractData.delivery_from}
            instructions={contractData.instructions}
            price={contractData.price}
            celebrityDiscountPercentage={contractData.discount_percentage}
            priceBeforeCelebrityDiscount={contractData.original_price}
          />
        </div>
        <div className={styles.PaymentMethodsPageContentRightSide}>
          <PaymentsMethodsSelectorCard />
        </div>
      </div>
      <WhatHappensBeforeBanner />
    </PageContainer>
  );
}

const _PaymentMethodsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethodsPage);

export { _PaymentMethodsPage as PaymentMethodsPage };
