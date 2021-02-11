import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { contractOperations } from "../../../state/ducks/contracts";
import { PageContainer } from "../../layouts/page-container";

const ClientHiringPage = ({ getContract, contract = {} }) => {
  const {
    query: { contract_reference }
  } = useRouter();

  useEffect(() => {
    if (!contract_reference) return;
    getContract(contract_reference);
  }, [contract_reference, getContract]);

  useEffect(() => {
    document.getElementsByClassName("f-main-body")[0].style.background =
      "#f7f7f7";
    return () => {
      document.getElementsByClassName("f-main-body")[0].style.background =
        "#fff";
    };
  }, []);

  return (
    <div className="ClientHiringPage">
      <PageContainer>
        <div style={{ height: "82vh" }}>
          contract:
          <pre>{JSON.stringify(contract)}</pre>
        </div>
      </PageContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.contracts.getContractReducer.loading,
  contract: state.contracts.getContractReducer.data.contract,
  isCompleted: state.contracts.getContractReducer.completed
});

const mapDispatchToProps = {
  getContract: contractOperations.getContract
};

const _ClientHiringPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientHiringPage);

export { _ClientHiringPage as ClientHiringPage };
