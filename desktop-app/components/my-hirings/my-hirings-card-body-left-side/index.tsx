import Maybe from "desktop-app/components/common/helpers/maybe";
import {
  canEditContract,
  COMPLETED,
} from "desktop-app/constants/contractStatuses";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import { ContractIsPublicChanger } from "../contract-is-public-changer";
import styles from "./styles.module.scss";
import { Link } from "desktop-app/components/common/routing/link";
import { getClientHiringPreviewPath } from "constants/paths";
import { MyHiringsCardContractInfo } from "desktop-app/components/my-hirings/my-hirings-card-contract-info";

type MyHiringsCardBodyLeftSideProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCardBodyLeftSide({
  contractData,
}: MyHiringsCardBodyLeftSideProps) {
  const canEdit = canEditContract(contractData.status);

  const isCompleted = contractData.status === COMPLETED;
  return (
    <>
      <MyHiringsCardContractInfo contractData={contractData} />
      <ContractIsPublicChanger
        className={
          isCompleted
            ? styles.IsPublicChangerIsCompleted
            : styles.IsPublicChanger
        }
        contractStatus={contractData.status}
        contractId={contractData.id}
        contractIsPublic={contractData.isPublic}
        contractReference={contractData.reference}
        celebrityId={contractData.celebrityId}
      />
      <Maybe it={canEdit}>
        <p className={styles.EditingCopy}>
          *Puedes editar las instrucciones de tu video y la información de
          entrega mientras tu video esté pendiente de grabación.
        </p>
      </Maybe>
      <Maybe it={isCompleted}>
        <Link
          href={getClientHiringPreviewPath(contractData.reference)}
          className={styles.WatchVideoLink}
        >
          <button
            type="button"
            className={"btn btn-primary " + styles.WatchVideoButton}
          >
            Ver video <i className="fa fa-play" />
          </button>
        </Link>
        <button
          type="button"
          className={`btn btn-tertiary ${styles.CTAButton}`}
        >
          Descargar comprobante de pago
        </button>
      </Maybe>
    </>
  );
}

export { MyHiringsCardBodyLeftSide };
