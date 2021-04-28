import { useAuth0 } from "@auth0/auth0-react";
import { getCelebrityProfilePath } from "constants/paths";
import { REJECTED } from "desktop-app/constants/contractStatuses";
import MyHiringsContract from "desktop-app/types/myHiringsContract";
import Maybe from "../../common/helpers/maybe";
import { Link } from "../../common/routing/link";
import { GrayBanner } from "../../layouts/gray-banner";
import styles from "./styles.module.scss";

type ApologyBannerProps = {
  contractData: MyHiringsContract;
};

function ApologyBanner({ contractData }: ApologyBannerProps) {
  const { user } = useAuth0();
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
        los procesos bancarios, este puede tardar un plazo de 5 a 10 días
        hábiles aproximados en estar disponible nuevamente, dependiendo de tu
        banco.
        <br />
        <Link href="#" className={styles.LearnMoreLink}>
          Conoce más acerca de esto.
        </Link>
      </p>
      <button type="button" className={`btn btn-tertiary ${styles.CTAButton}`}>
        Descargar comprobante de devolución
      </button>
      <Link href={getCelebrityProfilePath(contractData.celebrityData.username)}>
        <button type="button" className={`btn btn-primary ${styles.CTAButton}`}>
          Volver a solicitar un video a {contractData.celebrityData.fullName}
        </button>
      </Link>
    </GrayBanner>
  );
}

export { ApologyBanner };
