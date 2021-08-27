import Maybe from "desktop-app/components/common/helpers/maybe";
import ContractSummaryApproved from "desktop-app/components/contract/summary/approved";
import ContractSummaryAuthorized from "desktop-app/components/contract/summary/authorized";
import ContractSummaryPending from "desktop-app/components/contract/summary/pending";
import ContractSummaryRejected from "desktop-app/components/contract/summary/rejected";
import PageContainer from "desktop-app/components/layouts/page-container";
import React, { useEffect } from "react";
import { contractOperations } from "react-app/src/state/ducks/contracts";
import { RootState } from "react-app/src/state/store";
import { connect, ConnectedProps } from "react-redux";
const CONTRACT_APPROVED_STATUS = [10, 50, 70, 100];
const CONTRACT_REJECTED_STATUS = [20, 30, 55, 60, 80];
const CONTRACT_AUTHORIZED_STATUS = [90];
const CONTRACt_PENDING_STATUS = [40];

// mapStateToProps
const mapStateToProps = (state: RootState) => ({
  isLoading: state.contracts.getPurchaseSummaryReducer.loading,
  isCompleted: state.contracts.getPurchaseSummaryReducer.completed,
  contractWithPayments: state.contracts.getPurchaseSummaryReducer.data,
});
// mapStateToProps
const mapDispatchToProps = {
  getPurchaseSummary: contractOperations.getPurchaseSummaryV2,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ContractCreatedProps = {
  contractReference: string;
} & PropsFromRedux;
function ContractCreated({
  contractReference,
  getPurchaseSummary,
  isLoading,
  isCompleted,
  contractWithPayments,
}: ContractCreatedProps) {
  useEffect(() => {
    getPurchaseSummary(contractReference);
  }, []);
  console.log(contractWithPayments?.lastPayment);
  return (
    <PageContainer showFooter={false} showBotMakerFrame>
      <Maybe it={!isLoading && isCompleted}>
        <Maybe
          it={CONTRACT_APPROVED_STATUS.includes(
            contractWithPayments?.lastPayment?.status
          )}
        >
          <ContractSummaryApproved
            lastPayment={contractWithPayments?.lastPayment}
            contract={contractWithPayments?.contract}
            celebrity={contractWithPayments?.celebrity}
          />
        </Maybe>
        <Maybe
          it={CONTRACT_AUTHORIZED_STATUS.includes(
            contractWithPayments?.lastPayment?.status
          )}
        >
          <ContractSummaryAuthorized
            lastPayment={contractWithPayments?.lastPayment}
            contract={contractWithPayments?.contract}
            celebrity={contractWithPayments?.celebrity}
          />
        </Maybe>
        <Maybe
          it={CONTRACT_REJECTED_STATUS.includes(
            contractWithPayments?.lastPayment?.status
          )}
        >
          <ContractSummaryRejected
            lastPayment={contractWithPayments?.lastPayment}
            contract={contractWithPayments?.contract}
            celebrity={contractWithPayments?.celebrity}
          />
        </Maybe>
        <Maybe
          it={CONTRACt_PENDING_STATUS.includes(
            contractWithPayments?.lastPayment?.status
          )}
        >
          <ContractSummaryPending
            lastPayment={contractWithPayments?.lastPayment}
            contract={contractWithPayments?.contract}
            celebrity={contractWithPayments?.celebrity}
          />
        </Maybe>
      </Maybe>
    </PageContainer>
  );
}

const _ContractCreated = connector(ContractCreated);

export { _ContractCreated as ContractCreated };
