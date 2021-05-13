import PageContainer from "desktop-app/components/layouts/page-container";
import { useEffect } from "react";
import { getContract } from "react-app/src/state/ducks/contracts/actions";
import { useRouter } from "next/router";
import { CLIENT_HIRINGS } from "constants/paths";
import { connect } from "react-redux";
import { ClientHiringForOther } from "desktop-app/components/client-hiring/client-hiring-for-other";
import Maybe from "desktop-app/components/common/helpers/maybe";

const mapStateToProps = (state) => ({
  isLoading: state.contracts.getContractReducer.loading,
  contract: state.contracts.getContractReducer.data,
  isCompleted: state.contracts.getContractReducer.completed,
  isFailed: state.contracts.getContractReducer.failed,
});

const mapDispatchToProps = {
  getContract,
};

type StateProps = ReturnType<typeof mapStateToProps>;

type DispatchProps = typeof mapDispatchToProps;

type ClientHiringPageProps = {
  contractReference: string;
} & StateProps &
  DispatchProps;

function ClientHiringPage({
  contractReference,
  getContract,
  contract,
  isFailed,
}: ClientHiringPageProps) {
  const router = useRouter();

  useEffect(() => {
    console.log({ contractReference });
    if (!contractReference) return;
    getContract(contractReference);
  }, []);

  useEffect(() => {
    if (!isFailed) return;
    router.push(CLIENT_HIRINGS);
  }, [isFailed, router]);

  console.log(contract);

  return (
    <PageContainer showFooter={false}>
      <Maybe it={contract.celebrityData && contract.contractType !== 2}>
        <ClientHiringForOther contractData={contract} />
      </Maybe>
    </PageContainer>
  );
}

const _ClientHiringPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientHiringPage);

export { _ClientHiringPage as ClientHiringPage };
