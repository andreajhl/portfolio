import { RootState } from "react-app/src/state/store";
import { CREATE_CONTRACT_WIZARD_TEST_ID } from "__test__/testids";
import { getLocalContractInProgress } from "lib/utils/localContractInProgress";
import { useAuth } from "lib/famosos-auth";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getUserContractInProgress,
  cleanUserContractInProgress,
} from "react-app/src/state/ducks/contracts/actions";
import { connect, ConnectedProps } from "react-redux";
import { celebrityType } from "desktop-app/types/celebrityType";
import { CreateContractWizardSkeleton } from "../create-contract-wizard/skeleton";
import dynamic from "next/dynamic";
import { ComponentProps as CreateContractWizardProps } from "desktop-app/components/celebrity-profile/create-contract-wizard/types";
import ContractInProgressType from "desktop-app/types/contractInProgressType";

const CreateContractWizard = dynamic<CreateContractWizardProps>(
  () =>
    import(
      "desktop-app/components/celebrity-profile/create-contract-wizard"
    ).then((mod) => mod.CreateContractWizard),
  { loading: () => <CreateContractWizardSkeleton /> }
);

const mapStateToProps = ({ contracts }: RootState) => ({
  contractInProgressRequest: contracts.getUserContractInProgressReducer,
});

const mapDispatchToProps = {
  getUserContractInProgress,
  cleanUserContractInProgress,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropFromRedux = ConnectedProps<typeof connector>;

type CreateContractContainerProps = {
  className?: string;
  celebrity: celebrityType;
  onReadyToCreateContract?: (
    contractInProgress: ContractInProgressType
  ) => void;
} & PropFromRedux;

function CreateContractContainer({
  className,
  celebrity,
  onReadyToCreateContract: onReadyToCreateContractProp,
  getUserContractInProgress,
  cleanUserContractInProgress,
  contractInProgressRequest,
}: CreateContractContainerProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [isReadyToCreateContract, setIsReadyToCreateContract] = useState(false);
  const onReadyToCreateContractRef = useRef<
    (contractInProgress: ContractInProgressType) => void
  >();
  onReadyToCreateContractRef.current = onReadyToCreateContractProp;

  const localContractInProgress = useMemo(
    () => getLocalContractInProgress(celebrity.id),
    [celebrity.id]
  );

  useEffect(() => {
    if (!isAuthenticated || localContractInProgress) return;
    getUserContractInProgress(celebrity.username);
  }, [
    celebrity.username,
    getUserContractInProgress,
    isAuthenticated,
    localContractInProgress,
  ]);

  useEffect(() => {
    if (
      localContractInProgress ||
      contractInProgressRequest.completed ||
      (!isLoading && !isAuthenticated)
    ) {
      setIsReadyToCreateContract(true);
    }
  }, [
    contractInProgressRequest.completed,
    isAuthenticated,
    isLoading,
    localContractInProgress,
  ]);

  const contractInProgressRef = useRef(null);
  contractInProgressRef.current =
    localContractInProgress || contractInProgressRequest?.data;
  const contractInProgress = contractInProgressRef.current;

  useEffect(() => {
    if (!isReadyToCreateContract) return;
    onReadyToCreateContractRef.current?.(contractInProgressRef.current);
  }, [isReadyToCreateContract]);

  useEffect(() => {
    // Ensure that <CreateContractWizard /> is displayed even if something fails to prevent payment flow interruptions.
    const timeout = setTimeout(() => {
      setIsReadyToCreateContract(true);
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(
    () => () => {
      setIsReadyToCreateContract(false);
      cleanUserContractInProgress();
    },
    [cleanUserContractInProgress, celebrity.username]
  );

  if (!isReadyToCreateContract) {
    return <CreateContractWizardSkeleton className={className} />;
  }

  return (
    <CreateContractWizard
      data-testid={CREATE_CONTRACT_WIZARD_TEST_ID}
      className={className}
      celebrity={celebrity}
      contractInProgress={contractInProgress}
    />
  );
}

const _CreateContractContainer = connector(CreateContractContainer);

export { _CreateContractContainer as CreateContractContainer };
