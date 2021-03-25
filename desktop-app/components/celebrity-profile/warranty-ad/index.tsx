import styles from "./styles.module.scss";

type WarrantyAdProps = {};

function WarrantyAd(props: WarrantyAdProps) {
  return (
    <section className={styles.WarrantyAd}>
      <img
        src="/assets/img/famosos-warranty-icon.png"
        alt="Logo de Garantía Famosos"
      />
      <h3>Garantía Famosos</h3>
      <p>
        Video grabado por
        <br />
        Andrés Cepeda
        <br />
        100% personalizado.
        <br />
      </p>
      <p>
        Si no recibes tu video en
        <br />
        7 días te reembolsamos
        <br /> el 100% de tu dinero.
        <span className={styles.WarrantyAdInfoIcon}>
          <i className="fas fa-info-circle" />
        </span>
      </p>
    </section>
  );
}

export { WarrantyAd };
