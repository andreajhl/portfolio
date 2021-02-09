import React from "react";

const onlyMobileLineBreak = <br className="d-sm-none" />;
const onlyDesktopLineBreak = <br className="d-none d-sm-inline" />;

const HowToGetAVideoMessageLayout = () => {
  return (
    <section className="HowToGetAVideoMessageLayout py-4">
      <div className="container mb-0">
        <h2 className="HowToGetAVideoMessageLayout__title mb-5 mb-lg-3">
          ¿Comó solicitar {onlyMobileLineBreak} un {onlyDesktopLineBreak}{" "}
          videomensaje en Famosos?
        </h2>
        <ul className="HowToGetAVideoMessageLayout__steps-list container mb-0">
          <li className="HowToGetAVideoMessageLayout__step-item">
            <div className="HowToGetAVideoMessageLayout__step-number">1</div>
            <p className="HowToGetAVideoMessageLayout__step-text">
              Da clic en el {onlyMobileLineBreak} botón {onlyDesktopLineBreak}{" "}
              "Quiero
              {onlyMobileLineBreak} un video".
            </p>
          </li>
          <li className="HowToGetAVideoMessageLayout__step-item">
            <div className="HowToGetAVideoMessageLayout__step-number">2</div>
            <p className="HowToGetAVideoMessageLayout__step-text">
              Detalla la solicitud y {onlyMobileLineBreak} realiza{" "}
              {onlyDesktopLineBreak}
              el proceso {onlyMobileLineBreak} de compra.
            </p>
          </li>
          <li className="HowToGetAVideoMessageLayout__step-item">
            <div className="HowToGetAVideoMessageLayout__step-number">3</div>
            <p className="HowToGetAVideoMessageLayout__step-text">
              ¡Y listo! en poco {onlyMobileLineBreak} tiempo
              {onlyDesktopLineBreak} recibirás tu {onlyMobileLineBreak}{" "}
              videomensaje.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HowToGetAVideoMessageLayout;
