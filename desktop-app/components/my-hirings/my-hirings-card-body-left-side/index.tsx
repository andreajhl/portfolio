import Maybe from "desktop-app/components/common/helpers/maybe";
import {
  canEditContract,
  COMPLETED,
} from "desktop-app/constants/contractStatuses";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import { ContractIsPublicChanger } from "../contract-is-public-changer";
import { MyHiringsCardNotificationInfo } from "../my-hirings-card-notification-info";
import { MyHiringsCardDetails } from "../my-hirings-card-details";
import styles from "./styles.module.scss";
import { Link } from "desktop-app/components/common/routing/link";
import { getHiringPreviewPath } from "constants/paths";

type MyHiringsCardBodyLeftSideProps = {
  contractData: MyHiringsContract;
};

function MyHiringsCardBodyLeftSide({
  contractData,
}: MyHiringsCardBodyLeftSideProps) {
  const canEdit = canEditContract(contractData.status);
  return (
    <>
      <MyHiringsCardDetails contractData={contractData} />
      <MyHiringsCardNotificationInfo contractData={contractData} />
      <ContractIsPublicChanger
        className={styles.IsPublicChanger}
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
      <Maybe it={contractData.status === COMPLETED}>
        <Link
          href={getHiringPreviewPath(contractData.reference)}
          className={styles.WatchVideoLink}
        >
          <button
            type="button"
            className={"btn btn-primary " + styles.WatchVideoButton}
          >
            Ver video <i className="fa fa-play" />
          </button>
        </Link>
      </Maybe>
    </>
  );
}

export { MyHiringsCardBodyLeftSide };
