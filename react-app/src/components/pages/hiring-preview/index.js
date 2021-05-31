import React, { useEffect } from "react";
import { PageContainer } from "../../layouts/page-container";
import { HiringPreviewLayout } from "../../layouts/hiring-preview";
import { connect } from "react-redux";
import { contractOperations } from "../../../state/ducks/contracts";
import * as GTM from "../../../state/utils/gtm";
import Maybe from "../../common/helpers/maybe";
import { useRouter } from "next/router";
import { CLIENT_HIRINGS } from "react-app/src/routing/Paths";

function HiringPreviewPage({
  contractReference,
  getContract,
  contract,
  isCompleted,
  isFailed
}) {
  const router = useRouter();

  useEffect(() => {
    if (!contractReference) return;
    getContract(contractReference);
    GTM.tagManagerDataLayer("HIRING_PREVIEW_PAGE_VIEW", { contractReference });
  }, [contractReference]);

  useEffect(() => {
    document.getElementsByClassName("f-main-body")[0].style.background =
      "#f7f7f7";
    return () => {
      document.getElementsByClassName("f-main-body")[0].style.background =
        "#fff";
    };
  }, []);

  useEffect(() => {
    if (!isFailed) return;
    router.push(CLIENT_HIRINGS);
  }, [isFailed, router]);

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
}

const mapStateToProps = (state) => ({
  isLoading: state.contracts.getContractReducer.loading,
  contract: state.contracts.getContractReducer.data,
  isCompleted: state.contracts.getContractReducer.completed,
  isFailed: state.contracts.getContractReducer.failed
});

const mapDispatchToProps = {
  getContract: contractOperations.getContract
};

const _HiringPreviewPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HiringPreviewPage);

export { _HiringPreviewPage as HiringPreviewPage };
