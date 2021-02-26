import React, { useEffect } from "react";
import { connect } from "react-redux";
import { contractOperations } from "../../../state/ducks/contracts";
import { PageContainer } from "../../layouts/page-container";
import { useRouter } from "next/router";
import styled from "styled-components";
import { LoaderLayout } from "../../layouts/loader";
import ResumenContractRejected from "../../layouts/resumen-contract-rejected";
import { CLIENT_HIRINGS } from "react-app/src/routing/Paths";

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

const ContractWithPaymentsRejected = ({
  getContract,
  isLoading,
  resumen,
  contractToPayClear
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
  useEffect(() => {
    if (
      resumen?.lastPayment?.status &&
      ![20, 30, 55, 60, 80].includes(resumen?.lastPayment?.status)
    ) {
      router.push(CLIENT_HIRINGS);
    }
  }, [resumen]);
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
              margin: "auto"
            }}
          >
            <LoaderLayout></LoaderLayout>
          </div>
        </LoadingScreen>
      ) : [20, 30, 55, 60, 80].includes(resumen?.lastPayment?.status) ? (
        <ResumenContractRejected resumen={resumen} />
      ) : (
        <LoadingScreen>
          <div
            style={{
              margin: "auto"
            }}
          >
            <LoaderLayout></LoaderLayout>
          </div>
        </LoadingScreen>
      )}
    </PageContainer>
  );
};

// ResumenContractApproved [10,50,70,100]
// ResumenContractRejected [20,30,55,60,80]
// ResumenContractAuthorized [90]
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
const _ContractWithPaymentsRejected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractWithPaymentsRejected);
export { _ContractWithPaymentsRejected as ContractWithPaymentsRejected };
