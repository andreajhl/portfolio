import useStatus from "lib/hooks/useStatus";
import { updateHiredContract } from "react-app/src/state/ducks/contracts/actions";

type ValidParams = {
  contractType?: number;
  deliveryContact?: string;
  deliveryContactCellphone?: string;
  deliveryFrom?: string;
  deliveryTo?: string;
  deliveryType?: number;
  instructions?: string;
  isPublic?: boolean;
  occasion?: string;
};

function useUpdateHiredContract() {
  const [status, setStatus] = useStatus();

  async function startUpdateHiredContract(
    contractReference: string,
    params: ValidParams
  ) {
    setStatus("loading");
    await updateHiredContract(contractReference, params);
    setStatus("completed");
  }

  function setErrorStatus(error: any) {
    setStatus("rejected");
    throw error;
  }

  async function update(contractReference: string, params: ValidParams) {
    try {
      await startUpdateHiredContract(contractReference, params);
    } catch (error) {
      setErrorStatus(error);
    }
  }

  return { update, status, setStatus };
}

export { useUpdateHiredContract };
