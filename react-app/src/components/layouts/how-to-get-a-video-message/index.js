import React from "react";
import { FormattedMessage } from "react-intl";

const onlyMobileLineBreak = <br className="d-sm-none" />;
const onlyDesktopLineBreak = <br className="d-none d-sm-inline" />;

const HowToGetAVideoMessageLayout = () => {
  return (
    <section className="HowToGetAVideoMessageLayout py-4">
      <div className="container mb-0">
        <h2 className="HowToGetAVideoMessageLayout__title mb-5 mb-lg-3">
          <FormattedMessage
            defaultMessage="¿Comó solicitar {onlyMobileLineBreak} un {onlyDesktopLineBreak}
          videomensaje en Famosos?"
            values={{
              onlyMobileLineBreak: onlyMobileLineBreak,
              onlyDesktopLineBreak: onlyDesktopLineBreak
            }}
          />
        </h2>
        <ul className="HowToGetAVideoMessageLayout__steps-list container mb-0">
          <li className="HowToGetAVideoMessageLayout__step-item">
            <div className="HowToGetAVideoMessageLayout__step-number number--1">
              1
            </div>
            <p className="HowToGetAVideoMessageLayout__step-text">
              <FormattedMessage
                defaultMessage={`Da clic en el {onlyMobileLineBreak} botón {onlyDesktopLineBreak} "Comprar video {onlyMobileLineBreak} ahora"`}
                values={{
                  onlyMobileLineBreak: onlyMobileLineBreak,
                  onlyDesktopLineBreak: onlyDesktopLineBreak
                }}
              />
            </p>
          </li>
          <li className="HowToGetAVideoMessageLayout__step-item">
            <div className="HowToGetAVideoMessageLayout__step-number number--2">
              2
            </div>
            <p className="HowToGetAVideoMessageLayout__step-text">
              <FormattedMessage
                defaultMessage="Detalla la solicitud y {onlyMobileLineBreak} realiza
              {onlyDesktopLineBreak}
              el proceso {onlyMobileLineBreak} de compra."
                values={{
                  onlyMobileLineBreak: onlyMobileLineBreak,
                  onlyDesktopLineBreak: onlyDesktopLineBreak
                }}
              />
            </p>
          </li>
          <li className="HowToGetAVideoMessageLayout__step-item">
            <div className="HowToGetAVideoMessageLayout__step-number number--3">
              3
            </div>
            <p className="HowToGetAVideoMessageLayout__step-text">
              <FormattedMessage
                defaultMessage="¡Y listo! en poco {onlyMobileLineBreak} tiempo
              {onlyDesktopLineBreak} recibirás tu {onlyMobileLineBreak}
              videomensaje."
                values={{
                  onlyMobileLineBreak: onlyMobileLineBreak,
                  onlyDesktopLineBreak: onlyDesktopLineBreak
                }}
              />
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export { HowToGetAVideoMessageLayout };
