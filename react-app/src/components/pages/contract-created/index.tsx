import React, { useEffect } from "react";
import * as GTM from "../../../state/utils/gtm";
import { connect } from "react-redux";
import { contractOperations } from "../../../state/ducks/contracts";
import { PageContainer } from "../../layouts/page-container";
import { useRouter } from "next/router";
import styled from "styled-components";
import { LoaderLayout } from "../../layouts/loader";
import ResumenContractApproved from "../../layouts/resumen-contract-approved";
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

const ContractCreatedPage = ({
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

  useEffect(() => {
    if (
      resumen?.lastPayment?.status &&
      ![10, 40, 50, 70, 100, 90].includes(resumen?.lastPayment?.status)
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
              margin: "auto",
            }}
          >
            <LoaderLayout></LoaderLayout>
          </div>
        </LoadingScreen>
      ) : [10, 40, 50, 70, 100, 90].includes(resumen?.lastPayment?.status) ? (
        <ResumenContractApproved resumen={resumen} />
      ) : (
        <LoadingScreen>
          <div
            style={{
              margin: "auto",
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
// ResumenContractAuthorized [90]
// ResumenContractPending [40]

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
const _ContractCreatedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractCreatedPage);
export { _ContractCreatedPage as ContractCreatedPage };
