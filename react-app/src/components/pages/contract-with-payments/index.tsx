import React, { useEffect } from "react";
import * as GTM from "../../../state/utils/gtm";
import { connect } from "react-redux";
import { contractOperations } from "../../../state/ducks/contracts";
import { PageContainer } from "../../layouts/page-container";
import { useRouter } from "next/router";
import styled from "styled-components";
import { LoaderLayout } from "../../layouts/loader";
import ResumenContractApproved from "../../layouts/resumen-contract-approved";
import ResumenContractRejected from "../../layouts/resumen-contract-rejected";
import ResumenContractPending from "../../layouts/resumen-contract-pending";
import ResumenContractAuthorized from "../../layouts/resumen-contract-authorized";

const PAYMENTS_ID_WITH_RESUMEN_APPROVED = [10, 50, 70, 100];
const PAYMENTS_ID_WITH_RESUMEN_REJECTED = [20, 30, 55, 60, 80];
const PAYMENTS_ID_WITH_RESUMEN_PENDING = [40];
const PAYMENTS_ID_WITH_RESUMEN_AUTHORIZED = [90];

type ContractWithPaymentsProps = {
  resumen: {
    contract: {
      isPublic: boolean;
      instructions: string;
      deliveryContact: string;
      deliveryContactCellphone: string;
      deliveryTo: string;
      reference: string;
      status: number;
      authorizationDate: string;
    };
    celebrity: {
      username: string;
      avatar: string;
      fullName: string;
    };
    user: {
      id: number;
      fullName: string;
    };
    lastPayment: {
      id: number;
      createdAt: string;
      price: number;
      status: number;
      transactionChargeId: string;
      paymentMethodLogo: string;
    };
  };
  isLoading: boolean;
  getContract: Function;
  contractToPayClear: Function;
};

const ContractWithPayments = ({
  getContract,
  isLoading,
  resumen,
  contractToPayClear,
}: ContractWithPaymentsProps) => {
  const router = useRouter();
  const { contract_reference } = router.query;
  useEffect(() => {
    contractToPayClear();
  }, [contractToPayClear]);
  useEffect(() => {
    if (contract_reference) {
      getContract(contract_reference);
    }
  }, [contract_reference]);
  const LoadingScreen = styled.div`
    height: 90vh;
    display: flex;
    align-content: center;
    justify-content: center;
  `;
  return (
    <PageContainer showFooter={false} showSearch={false}>
      {isLoading ? (
        <LoadingScreen>
          <div
            style={{
              margin: "auto",
            }}
          >
            <LoaderLayout></LoaderLayout>
          </div>
        </LoadingScreen>
      ) : PAYMENTS_ID_WITH_RESUMEN_APPROVED.includes(
          resumen?.lastPayment?.status
        ) ? (
        <ResumenContractApproved resumen={resumen} />
      ) : PAYMENTS_ID_WITH_RESUMEN_REJECTED.includes(
          resumen?.lastPayment?.status
        ) ? (
        <ResumenContractRejected resumen={resumen} />
      ) : PAYMENTS_ID_WITH_RESUMEN_PENDING.includes(
          resumen?.lastPayment?.status
        ) ? (
        <ResumenContractPending resumen={resumen} />
      ) : PAYMENTS_ID_WITH_RESUMEN_AUTHORIZED.includes(
          resumen?.lastPayment?.status
        ) ? (
        <ResumenContractAuthorized resumen={resumen} />
      ) : null}
    </PageContainer>
  );
};

// ResumenContractApproved [10,50,70,100]
// ResumenContractRejected [20,30,55,60,80]
// ResumenContractAuthorized [90]
// ResumenContractPending [40]
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
  contractCreated: state.contracts.saveClientContractReducer.data,
});
// mapStateToProps
const mapDispatchToProps = {
  getContract: contractOperations.getContractWithPayments,
  contractToPayClear: contractOperations.saveContractToPayClear,
};

// Export Class
const _ContractWithPayments = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractWithPayments);
export { _ContractWithPayments as ContractWithPayments };
