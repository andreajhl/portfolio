import styles from "./styles.module.scss";

function MaintenancePage() {
  return (
    <div className={styles.MaintenancePage}>
      <div className="a">
        <img
          src="assets/img/maintenance-illustration.png"
          alt="En mantenimiento"
          width="279"
          height="278"
        />
      </div>
      <p className="aviso">
        En este momento estamos haciendo mantenimiento a nuestra
        infraestructura.
        <br />
        Por favor visítanos más tarde o escríbenos a{" "}
        <a href="mailto:hola@famosos.com">hola@famosos.com</a>
      </p>
      <p>
        At this moment we are maintaining our infrastructure. <br />
        Please visit us later or write to{" "}
        <a href="mailto:hola@famosos.com">hola@famosos.com</a>
      </p>
      <p>
        Neste momento estamos mantendo nossa infraestrutura. <br />
        Visite-nos mais tarde ou escreva para{" "}
        <a href="mailto:hola@famosos.com">hola@famosos.com</a>
      </p>
    </div>
  );
}

export { MaintenancePage };
