import { useAuth } from "lib/famosos-auth";
import {
  getCelebrityProfilePath,
  PAYMENT_AUTHORIZATION_INFO,
} from "constants/paths";
import { REJECTED } from "desktop-app/constants/contractStatuses";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import Maybe from "../../common/helpers/maybe";
import { Link } from "../../common/routing/link";
import { GrayBanner } from "../../layouts/gray-banner";
import styles from "./styles.module.scss";
import classes from "classnames";
import { DownloadReceiptLink } from "desktop-app/components/my-hirings/download-receipt-link";

type ApologyBannerProps = {
  contractData: MyHiringsContract;
};

function ApologyBanner({ contractData }: ApologyBannerProps) {
  const { user } = useAuth();
  return (
    <GrayBanner
      as="section"
      renderContainer={false}
      className={styles.ApologyBanner}
    >
      <h2 className={styles.Title}>Lo sentimos {user?.given_name || null}</h2>
      <p className={styles.DynamicText}>
        <Maybe
          it={contractData.status === REJECTED}
          orElse={
            <>
              En ocasiones se presentan causas de fuerza mayor que impiden que
              el Famoso grabe. <br /> ¡Lamentamos el tiempo de espera!
            </>
          }
        >
          La solicitud de tu video ha sido rechazada.
          <br /> Algunas de las razones podrías ser las siguientes: <br /> Tu
          solicitud es de tipo comercial, política o contenía alguna petición
          ofensiva/sensible para el Famoso.
        </Maybe>
      </p>
      <p>
        Hemos hecho la orden de reembolso de tu dinero, ten en cuenta que por
        los procesos bancarios, este puede tardar un plazo máximo de 21 días
        hábiles en estar disponible nuevamente, dependiendo de tu banco.
        <br />
        <a
          href={PAYMENT_AUTHORIZATION_INFO}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.LearnMoreLink}
        >
          Conoce más acerca de esto.
        </a>
      </p>
      <DownloadReceiptLink
        className={classes("btn btn-tertiary", styles.CTAButton)}
        contractId={contractData.id}
        contractReference={contractData.reference}
        contractStatus={contractData.status}
      />
      <Link
        className={classes("btn btn-primary", styles.CTALink, styles.CTAButton)}
        href={getCelebrityProfilePath(contractData.celebrityData.username, {
          focusCreateContractWizard: true,
        })}
      >
        Volver a solicitar un video a {contractData.celebrityData.fullName}
      </Link>
    </GrayBanner>
  );
}

export { ApologyBanner };
