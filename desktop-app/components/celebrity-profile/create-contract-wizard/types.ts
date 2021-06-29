import { celebrityType } from "desktop-app/types/celebrityType";
import ContractInProgressType from "desktop-app/types/contractInProgressType";

export type ComponentProps = {
  className?: string;
  celebrity: celebrityType;
  contractInProgress?: ContractInProgressType;
};
