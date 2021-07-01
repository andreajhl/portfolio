import styles from "./styles.module.scss";

type HiringPreviewBannerProps = {
  className?: string;
  celebrityFullName: string;
  deliveryTo: string;
};

function HiringPreviewBanner({
  className,
  celebrityFullName,
  deliveryTo,
}: HiringPreviewBannerProps) {
  return (
    <div className={className}>
      <img
        className={styles.FamososLogo}
        src="/assets/img/famosos-icon.png"
        alt="Icono de Famosos Inc."
        width="51"
        height="49"
      />
      <h1 className={styles.Title}>
        Mira este video de {celebrityFullName} para {deliveryTo}.
      </h1>
    </div>
  );
}

export { HiringPreviewBanner };
