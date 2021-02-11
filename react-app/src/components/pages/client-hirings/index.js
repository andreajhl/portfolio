import React, { useEffect } from "react";
import { HiringsCardSectionLayout } from "../../layouts/hirings-card-section";
import { PageContainer } from "../../layouts/page-container";
import { connect } from "react-redux";
import { contractOperations } from "../../../state/ducks/contracts";
import * as GTM from "../../../state/utils/gtm";

const ClientHiringsPage = ({ listClientContracts, isLoading, contracts }) => {
  useEffect(() => {
    GTM.tagManagerDataLayer("CLIENT_HIRINGS_PAGE_VIEW");
    listClientContracts();
  }, []);

  useEffect(() => {
    document.getElementsByClassName("f-main-body")[0].style.background =
      "#f7f7f7";
    return () => {
      document.getElementsByClassName("f-main-body")[0].style.background =
        "#fff";
    };
  }, []);

  return (
    <div className="ClientHiringsPage">
      <PageContainer applyFetchCelebrities={false}>
        <HiringsCardSectionLayout isLoading={isLoading} contracts={contracts} />
      </PageContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.contracts.listClientContractsReducer.loading,
  contracts: state.contracts.listClientContractsReducer.data
});

// mapStateToProps
const mapDispatchToProps = {
  listClientContracts: contractOperations.listClientContracts
};

// Export Class
const _ClientHiringsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientHiringsPage);
export { _ClientHiringsPage as ClientHiringsPage };
