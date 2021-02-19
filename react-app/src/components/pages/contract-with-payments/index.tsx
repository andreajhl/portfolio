import React, { useEffect } from "react";
import { history } from "../../../routing/History";
import * as PATHS from "../../../routing/Paths";
import * as GTM from "../../../state/utils/gtm";
import { connect } from "react-redux";
import { contractOperations } from "../../../state/ducks/contracts";
import { PageContainer } from "../../layouts/page-container";
import moment from "moment";
import { useRouter } from "next/router";
import styled from "styled-components";
import { LoaderLayout } from "../../layouts/loader";
import { jsonToQueryString } from "react-app/src/state/utils/apiService";
import ResumenStatusPayment from "../../containers/resumen-status-payment";
import NextStepsAfterPaymentBanner from "../../containers/next-steps-after-payment-banner";
import ResumenContractApproved from "../../layouts/resumen-contract-approved";
import ResumenContractRejected from "../../layouts/resumen-contract-rejected";
import ResumenContractPending from "../../layouts/resumen-contract-pending";
import ResumenContractAuthorized from "../../layouts/resumen-contract-authorized";

const ContractWithPayments = ({ getContract, isLoading, resumen }) => {
  const router = useRouter();
  const { contract_reference } = router.query;
  const { lastPayment } = resumen;
  const status = 90;
  useEffect(() => {
    getContract(contract_reference);
  }, [contract_reference]);
  const LoadingScreen = styled.div`
    height: 80vh;
    display: flex;
    align-content: center;
    justify-content: center;
  `;
  return (
    <PageContainer showSearch={false}>
      {isLoading ? (
        <LoadingScreen>
          <div
            style={{
              margin: "auto"
            }}
          >
            <LoaderLayout></LoaderLayout>
          </div>
        </LoadingScreen>
      ) : status === 100 ? (
        <ResumenContractApproved resumen={resumen}></ResumenContractApproved>
      ) : status === 30 ? (
        <ResumenContractRejected resumen={resumen}></ResumenContractRejected>
      ) : status === 40 ? (
        <ResumenContractPending resumen={resumen} />
      ) : status === 90 ? (
        <ResumenContractAuthorized resumen={resumen} />
      ) : null}
    </PageContainer>
  );
};

// PaymentCreated      = 10
// PaymentCancelled    = 20
// PaymentRejected     = 30
// PaymentPending      = 40
// PaymentFailedRefund = 50
// PaymentFailedAuth   = 55
// PaymentFailedCharge = 60
// PaymentRefunded     = 70
// PaymentExpired      = 80
// PaymentAuthorized   = 90
// PaymentPaid         = 100

// mapStateToProps
const mapStateToProps = (state) => ({
  isLoading: state.contracts.getContractWithPaymentsReducer.loading,
  resumen: state.contracts.getContractWithPaymentsReducer.data,
  contractCreated: state.contracts.saveClientContractReducer.data
});
// mapStateToProps
const mapDispatchToProps = {
  getContract: contractOperations.getContractWithPayments,
  contractToPayClear: contractOperations.saveContractToPayClear
};

// Export Class
const _ContractWithPayments = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractWithPayments);
export { _ContractWithPayments as ContractWithPayments };
