import React, { useEffect } from "react";
import { PageContainer } from "../../layouts/page-container";
import { HiringPreviewLayout } from "../../layouts/hiring-preview";
import { connect } from "react-redux";
import { contractOperations } from "../../../state/ducks/contracts";
import * as GTM from "../../../state/utils/gtm";
import Maybe from "../../common/helpers/maybe";
import { useRouter, withRouter } from "next/router";

const HiringPreviewPage = ({ getContract, contract, isCompleted }) => {
  const {
    query: { contract_reference }
  } = useRouter();

  useEffect(() => {
    if (!contract_reference) return;
    getContract(contract_reference);
    GTM.tagManagerDataLayer("HIRING_PREVIEW_PAGE_VIEW", { contract_reference });
  }, [contract_reference]);

  useEffect(() => {
    document.getElementsByClassName("f-main-body")[0].style.background =
      "#f7f7f7";
    return () => {
      document.getElementsByClassName("f-main-body")[0].style.background =
        "#fff";
    };
  }, []);

  return (
    <div className="HiringPreviewPage">
      <PageContainer applyFetchCelebrities={false} showFooter={isCompleted}>
        <Maybe it={Boolean(contract.reference)}>
          <HiringPreviewLayout contract={contract} />
        </Maybe>
        <br />
      </PageContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.contracts.getContractReducer.loading,
  contract: state.contracts.getContractReducer.data,
  isCompleted: state.contracts.getContractReducer.completed
});

// mapStateToProps
const mapDispatchToProps = {
  getContract: contractOperations.getContract
};

// Export Class
const _HiringPreviewPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HiringPreviewPage));

export { _HiringPreviewPage as HiringPreviewPage };
