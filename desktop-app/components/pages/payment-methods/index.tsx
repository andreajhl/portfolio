import contractData from "constants/contract";
import { ContractInfo } from "desktop-app/components/payments-methods/contract-info";
import PageContainer from "desktop-app/components/layouts/page-container";
import { PageHeading } from "desktop-app/components/layouts/page-heading";
import { connect } from "react-redux";
import styles from "./styles.module.scss";

const mapStateToProps = (state) => ({ contractData });

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type PaymentMethodsProps = { contractReference: string } & StateProps &
  DispatchProps;

function PaymentMethodsPage({ contractData }: PaymentMethodsProps) {
  return (
    <PageContainer>
      <PageHeading showHomeLink={false}>Confirmación de compra</PageHeading>
      <div className="container">
        <ContractInfo
          celebrityAvatar={contractData.celebrity_avatar}
          celebrityFullName={contractData.celebrity_full_name}
          occasion={"BIRTHDAY"}
          deliveryTo={contractData.delivery_to}
          deliveryFrom={contractData.delivery_from}
          instructions={contractData.instructions}
        />
      </div>
    </PageContainer>
  );
}

const _PaymentMethodsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentMethodsPage);

export { _PaymentMethodsPage as PaymentMethodsPage };
