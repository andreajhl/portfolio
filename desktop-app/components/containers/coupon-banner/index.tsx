import styles from "./styles.module.scss";
const CouponBanner = () => {
  return (
    <div className={`${styles.CouponBanner}`}>
      <div>
        <span>¡10% de descuento en tus videomensajes! Cupón: FAN10</span>
      </div>
      <div>
        <span>LA OFERTA FINALIZA EN 2 HRS : 12 MIN</span>
      </div>
    </div>
  );
};

export default CouponBanner;
